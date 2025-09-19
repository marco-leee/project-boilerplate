import * as z from 'zod';

export const keyPairSchema = z.object({
  publicKey: z.string(),
  privateKey: z.string(),
});

export type KeyPair = z.infer<typeof keyPairSchema>;

export const encapsulationSchema = z.object({
  encapsulation: z.string(),
  symmetricKey: z.string(),
});

export type Encapsulation = z.infer<typeof encapsulationSchema>;

export const EncryptedDataSchema = z.object({
  iv: z.string(),
  tag: z.string(),
  encryptedData: z.string(),
});

export type EncryptedData = z.infer<typeof EncryptedDataSchema>;

export abstract class CryptoKeyStrategy {
  protected ENCODING: BufferEncoding = 'base64';

  abstract generateKeyPair(): Promise<KeyPair>;
  abstract symmetricKeyEncryption(data: string, symmetricKey: string): EncryptedData;
  abstract symmetricKeyDecryption(encryptedData: EncryptedData, symmetricKey: string): string;

  // Helper methods to convert between formats
  stringToBytes(keyString: string): Uint8Array {
    return Buffer.from(keyString, this.ENCODING);
  }

  bytesToString(keyBytes: Uint8Array): string {
    return Buffer.from(keyBytes).toString(this.ENCODING);
  }
}
