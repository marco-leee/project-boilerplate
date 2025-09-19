import {
  CryptoKeyStrategy,
  type KeyPair,
  type Encapsulation,
  type EncryptedData,
  keyPairSchema,
  encapsulationSchema,
  EncryptedDataSchema,
} from './base';
import { MlKem512, MlKem768, MlKem1024 } from 'mlkem';
import * as crypto from 'crypto';

type KyberKeySize = '512' | '768' | '1024';

export class KyberStrategy extends CryptoKeyStrategy {
  private keyPair: KeyPair | null = null;
  private encapsulation: Encapsulation | null = null;

  constructor(private keySize: KyberKeySize) {
    super();
  }

  setKeyPair(keyPair: KeyPair) {
    this.keyPair = keyPair;
  }

  setEncapsulation(encapsulation: Encapsulation) {
    this.encapsulation = encapsulation;
  }

  async generateKeyPair(): Promise<KeyPair> {
    let privateKey: Uint8Array;
    let publicKey: Uint8Array;

    switch (this.keySize) {
      case '512':
        [publicKey, privateKey] = await new MlKem512().generateKeyPair();
        break;
      case '768':
        [publicKey, privateKey] = await new MlKem768().generateKeyPair();
        break;
      case '1024':
        [publicKey, privateKey] = await new MlKem1024().generateKeyPair();
        break;
      default:
        throw new Error('Invalid key size');
    }

    return keyPairSchema.parse({
      publicKey: this.bytesToString(publicKey),
      privateKey: this.bytesToString(privateKey),
    });
  }

  async generateEncapsulation(publicKey: string): Promise<Encapsulation> {
    let encapsulationBytes: Uint8Array;
    let symmetricKeyBytes: Uint8Array;

    switch (this.keySize) {
      case '512':
        [encapsulationBytes, symmetricKeyBytes] = await new MlKem512().encap(
          this.stringToBytes(publicKey)
        );
        break;
      case '768':
        [encapsulationBytes, symmetricKeyBytes] = await new MlKem768().encap(
          this.stringToBytes(publicKey)
        );
        break;
      case '1024':
        [encapsulationBytes, symmetricKeyBytes] = await new MlKem1024().encap(
          this.stringToBytes(publicKey)
        );
        break;
      default:
        throw new Error('Invalid key size');
    }

    return encapsulationSchema.parse({
      encapsulation: this.bytesToString(encapsulationBytes),
      symmetricKey: this.bytesToString(symmetricKeyBytes),
    });
  }

  async decryptEncapsulation(encapsulation: string): Promise<Encapsulation> {
    if (!this.keyPair) {
      throw new Error('Key pair not set. Call generateKeyPair first.');
    }

    let symmetricKeyBytes: Uint8Array;

    switch (this.keySize) {
      case '512':
        symmetricKeyBytes = await new MlKem512().decap(
          this.stringToBytes(encapsulation),
          this.stringToBytes(this.keyPair.privateKey)
        );
        break;
      case '768':
        symmetricKeyBytes = await new MlKem768().decap(
          this.stringToBytes(encapsulation),
          this.stringToBytes(this.keyPair.privateKey)
        );
        break;
      case '1024':
        symmetricKeyBytes = await new MlKem1024().decap(
          this.stringToBytes(encapsulation),
          this.stringToBytes(this.keyPair.privateKey)
        );
        break;
    }

    return encapsulationSchema.parse({
      encapsulation,
      symmetricKey: this.bytesToString(symmetricKeyBytes),
    });
  }

  generateSharedSecret(): string {
    if (!this.encapsulation) {
      throw new Error('Encapsulation not set');
    }
    return this.encapsulation.symmetricKey;
  }

  encrypt(data: string): EncryptedData {
    if (!this.encapsulation) {
      throw new Error(
        'Encapsulation not set. Call generateEncapsulation first.'
      );
    }

    // Use the symmetric key for AES encryption
    const symmetricKeyBytes = Buffer.from(
      this.encapsulation.symmetricKey,
      this.ENCODING
    );

    // Generate a random IV for AES-GCM
    const iv = crypto.randomBytes(16);

    // Create cipher
    const cipher = crypto.createCipheriv('aes-256-gcm', symmetricKeyBytes, iv);
    cipher.setAAD(Buffer.alloc(0)); // No additional authenticated data

    // Encrypt the data
    let encrypted = cipher.update(data, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Get the authentication tag
    const tag = cipher.getAuthTag();

    return EncryptedDataSchema.parse({
      iv: iv.toString(this.ENCODING),
      tag: tag.toString(this.ENCODING),
      encryptedData: encrypted.toString(this.ENCODING),
    });
  }

  decrypt(encryptedData: EncryptedData): string {
    if (!this.encapsulation) {
      throw new Error(
        'Encapsulation not set. Call generateEncapsulation first.'
      );
    }

    const { iv, tag, encryptedData: encrypted } = encryptedData;

    // Use the symmetric key for AES decryption
    const symmetricKeyBytes = Buffer.from(
      this.encapsulation.symmetricKey,
      this.ENCODING
    );

    // Create decipher
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      symmetricKeyBytes,
      Buffer.from(iv, this.ENCODING)
    );
    decipher.setAuthTag(Buffer.from(tag, this.ENCODING));
    decipher.setAAD(Buffer.alloc(0)); // No additional authenticated data

    // Decrypt the data
    let decrypted = decipher.update(
      Buffer.from(encrypted, this.ENCODING),
      undefined,
      'utf8'
    );
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

const demo = async () => {
  const client = new KyberStrategy('1024');
  const server = new KyberStrategy('1024');
  const clientKey = await client.generateKeyPair();
  client.setKeyPair(clientKey);
  const encap = await server.generateEncapsulation(clientKey.publicKey);
  server.setEncapsulation(encap);
  const clientSideEncap = await client.decryptEncapsulation(encap.encapsulation);
  client.setEncapsulation(clientSideEncap);
  const message = "Hello, World!";
  const encrypted = client.encrypt(message);
  const decrypted = server.decrypt(encrypted);

  console.log(`message: ${message}`);
  console.log(`encrypted: `, encrypted);
  console.log(`decrypted: ${decrypted}`);

  const msg2 = "fuck you";
  const encrypted2 = server.encrypt(msg2);
  const decrypted2 = client.decrypt(encrypted2);

  console.log(`message: ${msg2}`);
  console.log(`encrypted: `, encrypted2);
  console.log(`decrypted: ${decrypted2}`);
};