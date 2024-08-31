import {
  DecryptCommand,
  EncryptCommand,
  GenerateDataKeyCommand,
  KMSClient,
} from "@aws-sdk/client-kms";
import * as crypto from "crypto";

const algorithm = "AES-256-ctr";
const iv = Buffer.from("0000000000000000", "hex");

const kmsClientInstance = new KMSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const generateDataKey = async (): Promise<string | null> => {
  try {
    const response = await kmsClientInstance.send(
      new GenerateDataKeyCommand({
        KeyId: process.env.KMS_KEY_ID,
        KeySpec: "AES_256",
      })
    );

    if (response.CiphertextBlob) {
      return Buffer.from(response.CiphertextBlob).toString("base64");
    } else {
      console.error("Encryption failed: No CiphertextBlob returned.");
      return null;
    }
  } catch (error) {
    console.error("Error during encryption:", error);
    return null;
  }
};

export const encryptKMS = async (plainText: string): Promise<string | null> => {
  try {
    const command = new EncryptCommand({
      KeyId: process.env.KMS_KEY_ID,
      Plaintext: Buffer.from(plainText),
    });

    const response = await kmsClientInstance.send(command);

    if (response.CiphertextBlob) {
      return Buffer.from(response.CiphertextBlob).toString("base64");
    } else {
      console.error("Encryption failed: No CiphertextBlob returned.");
      return null;
    }
  } catch (error) {
    console.error("Error during encryption:", error);
    return null;
  }
};

export const decryptKMS = async (base64Ciphertext: string) => {
  try {
    const command = new DecryptCommand({
      CiphertextBlob: Buffer.from(base64Ciphertext, "base64"),
      KeyId: process.env.KMS_KEY_ID,
    });

    const response = await kmsClientInstance.send(command);

    if (response.Plaintext) {
      return Buffer.from(response.Plaintext).toString("base64");
    } else {
      console.error("Decryption failed: No Plaintext returned.");
      return null;
    }
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

export const encrypt = (text: string, base64Key: string): string => {
  if (!text) {
    return null;
  }

  const key = Buffer.from(base64Key, "base64"); // Decode the key from base64
  if (key.length !== 32) {
    throw new Error("Invalid key length. Expected 32 bytes.");
  }

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return encrypted.toString("hex"); // Return as hex string
};

export const decrypt = (cipherText: string, base64Key: string): string => {
  if (!cipherText) {
    return null;
  }

  const key = Buffer.from(base64Key, "base64"); // Decode the key from base64
  if (key.length !== 32) {
    throw new Error("Invalid key length. Expected 32 bytes.");
  }

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(cipherText, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8"); // Return as utf8 string
};
