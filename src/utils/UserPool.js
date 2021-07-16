import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_2S4l3ACni",
  ClientId: "2g1trt90a7cjbdtu541ld5s8h8",
};

export default new CognitoUserPool(poolData);
