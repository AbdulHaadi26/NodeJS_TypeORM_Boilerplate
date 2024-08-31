import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const sesInstance = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  message: string
): Promise<void> => {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Data: message,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: process.env.AWS_SES_SOURCE_EMAIL,
  };

  try {
    await sesInstance.send(new SendEmailCommand(params));
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
