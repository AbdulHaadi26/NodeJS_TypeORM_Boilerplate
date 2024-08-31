import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";

const dynamoInstance = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getAllShops = async (): Promise<ScanCommandOutput> => {
  const params = {
    TableName: "shops",
  };

  const command = new ScanCommand(params);
  const response = await dynamoInstance.send(command);
  return response;
};
