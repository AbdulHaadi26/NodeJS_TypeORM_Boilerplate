import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

const lambdaClientInstance = new LambdaClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const invokeLambda = async (dataRefId: string, tenantId: string) => {
  try {
    const invokeCommand = new InvokeCommand({
      FunctionName: process.env.LAMBDA_FUNCTION_NAME,
      InvocationType: "Event",
      Payload: JSON.stringify({
        dataRefId,
        tenantId,
      }),
    });

    const data = await lambdaClientInstance.send(invokeCommand);
    console.log("Lambda function invoked successfully:", data);
  } catch (error) {
    console.error("Error invoking Lambda function:", error);
  }
};
