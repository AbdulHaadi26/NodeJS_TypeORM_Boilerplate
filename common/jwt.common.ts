import JWT, { JwtPayload } from "jsonwebtoken";
import { JWTPayloadType } from "../utils";

export const jwtSign = (payload: JWTPayloadType): string =>
  JWT.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

export const jwtVerify = (token: string): string | JwtPayload =>
  JWT.verify(token, process.env.JWT_SECRET as string);
