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

  getPublicKey(): string | null {
    return this.keyPair?.publicKey ?? null;
  }

  getEncapsulation(): Encapsulation | null {
    return this.encapsulation;
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

    this.keyPair = keyPairSchema.parse({
      publicKey: this.bytesToString(publicKey),
      privateKey: this.bytesToString(privateKey),
    });

    return this.keyPair;
  }

  /**
   * Everytime you generate an encapsulation, you will get a new symmetric key
   */
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

    this.encapsulation = encapsulationSchema.parse({
      encapsulation: this.bytesToString(encapsulationBytes),
      symmetricKey: this.bytesToString(symmetricKeyBytes),
    });

    return this.encapsulation;
  }

  /**
   * Be sure to use the same symmetric key for encryption and decryption
   */
  async decryptEncapsulation(
    encapsulation: string,
    privateKey: string
  ): Promise<Encapsulation> {
    let symmetricKeyBytes: Uint8Array;

    try {
      switch (this.keySize) {
        case '512':
          symmetricKeyBytes = await new MlKem512().decap(
            this.stringToBytes(encapsulation),
            this.stringToBytes(privateKey)
          );
          break;
        case '768':
          symmetricKeyBytes = await new MlKem768().decap(
            this.stringToBytes(encapsulation),
            this.stringToBytes(privateKey)
          );
          break;
        case '1024':
          symmetricKeyBytes = await new MlKem1024().decap(
            this.stringToBytes(encapsulation),
            this.stringToBytes(privateKey)
          );
          break;
        default:
          throw new Error(`Invalid key size: ${this.keySize}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to decrypt encapsulation: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

    return encapsulationSchema.parse({
      encapsulation,
      symmetricKey: this.bytesToString(symmetricKeyBytes),
    });
  }

  symmetricKeyEncryption(message: string, symmetricKey: string): EncryptedData {
    try {
      // Use the symmetric key for AES encryption
      const symmetricKeyBytes = Buffer.from(symmetricKey, this.ENCODING);

      // Validate key size for AES-256 (32 bytes)
      if (symmetricKeyBytes.length !== 32) {
        throw new Error(
          `Invalid symmetric key length: expected 32 bytes for AES-256, got ${symmetricKeyBytes.length} bytes`
        );
      }

      // Generate a random IV for AES-GCM
      const iv = crypto.randomBytes(16);

      // Create cipher
      const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        symmetricKeyBytes,
        iv
      );
      cipher.setAAD(Buffer.from('intellistixman'));

      // Encrypt the data
      let encrypted = cipher.update(message, 'utf8');
      encrypted = Buffer.concat([encrypted, cipher.final()]);

      // Get the authentication tag
      const tag = cipher.getAuthTag();

      return EncryptedDataSchema.parse({
        iv: iv.toString(this.ENCODING),
        tag: tag.toString(this.ENCODING),
        encryptedData: encrypted.toString(this.ENCODING),
      });
    } catch (error) {
      throw new Error(
        `Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  symmetricKeyDecryption(
    encryptedData: EncryptedData,
    symmetricKey: string
  ): string {
    try {
      const { iv, tag, encryptedData: encrypted } = encryptedData;

      // Use the symmetric key for AES decryption
      const symmetricKeyBytes = Buffer.from(symmetricKey, this.ENCODING);

      // Validate key size for AES-256 (32 bytes)
      if (symmetricKeyBytes.length !== 32) {
        throw new Error(
          `Invalid symmetric key length: expected 32 bytes for AES-256, got ${symmetricKeyBytes.length} bytes`
        );
      }

      // Create decipher
      const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        symmetricKeyBytes,
        Buffer.from(iv, this.ENCODING)
      );
      decipher.setAuthTag(Buffer.from(tag, this.ENCODING));
      decipher.setAAD(Buffer.from('intellistixman'));

      // Decrypt the data
      let decrypted = decipher.update(
        Buffer.from(encrypted, this.ENCODING),
        undefined,
        'utf8'
      );
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      throw new Error(
        `Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}. This could be due to: incorrect key, tampered data, or mismatched encoding.`
      );
    }
  }
}

const demo = async () => {
  const client = new KyberStrategy('1024');
  const server = new KyberStrategy('1024');
  const { privateKey, publicKey } = await client.generateKeyPair();
  const serverEncap = await server.generateEncapsulation(publicKey);
  const clientEncap = await client.decryptEncapsulation(
    serverEncap.encapsulation,
    privateKey
  );
  const message = 'Hello, World!';
  const encrypted = client.symmetricKeyEncryption(
    message,
    clientEncap.symmetricKey
  );
  const decrypted = server.symmetricKeyDecryption(
    encrypted,
    serverEncap.symmetricKey
  );

  console.log(`message: ${message}`);
  console.log(`encrypted: `, encrypted);
  console.log(`decrypted: ${decrypted}`);

  const msg2 = 'fuck you';
  const encrypted2 = server.symmetricKeyEncryption(
    msg2,
    serverEncap.symmetricKey
  );
  const decrypted2 = client.symmetricKeyDecryption(
    encrypted2,
    clientEncap.symmetricKey
  );

  console.log(`message: ${msg2}`);
  console.log(`encrypted: `, encrypted2);
  console.log(`decrypted: ${decrypted2}`);
};

// demo();
