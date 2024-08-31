import {
  AdminAddUserToGroupCommandInput,
  AdminCreateUserCommandInput,
  CognitoIdentityProvider,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoInstance = new CognitoIdentityProvider({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const createUser = async (
  username: string,
  email: string,
  userType: number,
  tenantId: string
) => {
  try {
    let userData: AdminCreateUserCommandInput = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "custom:tenantId",
          Value: tenantId,
        },
        {
          Name: "custom:userRole",
          Value: "TenantUser",
        },
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
      DesiredDeliveryMediums: ["EMAIL"],
    };

    await cognitoInstance.adminCreateUser(userData);
  } catch (error) {
    console.log(error);
    throw new Error(`Cognito user creation failed: ${error.message}`);
  }
};

export const addToGroup = async (username: string, group: string) => {
  try {
    const addToGroupData: AdminAddUserToGroupCommandInput = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      GroupName: group,
    };

    await cognitoInstance.adminAddUserToGroup(addToGroupData);
  } catch (error) {
    console.log(error);
    throw new Error(`Cognito user addition to group failed: ${error.message}`);
  }
};
