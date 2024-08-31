import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

const ssmClient = new SecretsManagerClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getFromSecretManager = async (secretName: string) => {
  try {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await ssmClient.send(command);
    const secretData = JSON.parse(response.SecretString);
    return secretData;
  } catch (error) {
    console.log("Error fetching values from Secrets Manager:", error);
  }
};
