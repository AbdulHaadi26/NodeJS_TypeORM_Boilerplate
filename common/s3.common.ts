import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3ClientInstance = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getObject = async (
  Key: string,
  ContentType: string
): Promise<any> => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      ResponseContentType: ContentType,
    });
    const response = await s3ClientInstance.send(command);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const putObject = async (
  Key: string,
  ContentType: string,
  Body: any,
  ContentDisposition?: string
): Promise<PutObjectCommandOutput> => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    ContentType,
    Body,
    ContentDisposition,
  });

  const response = await s3ClientInstance.send(command);

  return response;
};

export const getPreSignedURL = async (
  Key: string,
  ResponseContentType: string
): Promise<string> => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      ResponseContentType,
    });
    const url = await getSignedUrl(s3ClientInstance, command, {
      expiresIn: 86400 * 7,
    });
    return url;
  } catch (e) {
    return Key;
  }
};

export const putPreSignedURL = async (
  Key: string,
  ContentType: string
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    ContentType,
  });

  const url = await getSignedUrl(s3ClientInstance, command, {
    expiresIn: 86400,
  });

  return url;
};

export const deleteObject = async (Key: string): Promise<any> => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
    });

    const response = await s3ClientInstance.send(command);

    return response;
  } catch (e) {
    console.log(e);
  }
};
