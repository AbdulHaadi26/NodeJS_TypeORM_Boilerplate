import {
  Action,
  ChannelType,
  PinpointClient,
  SendMessagesCommand,
} from "@aws-sdk/client-pinpoint";
import { DeviceTypes } from "../utils";

const pinpointInstance = new PinpointClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const generateMessageConfiguration = (
  title: string,
  body: string,
  deviceType: string
) => {
  const parsedBody = JSON.parse(body);

  if (DeviceTypes.ANDROID === deviceType || DeviceTypes.IOS === deviceType) {
    return {
      GCMMessage: {
        Title: "",
        Action: Action.OPEN_APP,
        Body: "",
        ImageIconUrl: "",
        ImageUrl: "",
        RawContent: JSON.stringify({
          notification: {
            title: title,
            body: parsedBody.message,
          },
          data: parsedBody,
        }),
      },
    };
  }

  return {
    GCMMessage: {
      Action: Action.OPEN_APP,
      Body: body,
      Title: title,
      Url: process.env.BASE_URL,
    },
  };
};

export const sendPinpointNotification = async (
  deviceToken: string,
  title: string,
  body: string,
  deviceType: DeviceTypes
): Promise<void> => {
  console.log("Sending notification to:", deviceToken, deviceType);
  console.log("Title:", title);
  console.log("Body:", body);

  try {
    const params: any = {
      ApplicationId: process.env.AWS_PINPOINT_APP_ID,
      MessageRequest: {
        Addresses: {
          [deviceToken]: {
            ChannelType: ChannelType.GCM,
          },
        },
        MessageConfiguration: generateMessageConfiguration(
          title,
          body,
          deviceType
        ),
      },
    };

    const sendMessagesCommand = new SendMessagesCommand(params);

    const notification = await pinpointInstance.send(sendMessagesCommand);
    console.log(notification);
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new Error("Failed to send notification");
  }
};
