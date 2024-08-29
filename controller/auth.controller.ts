import { Request, Response } from "express";
import { signIn } from "../services";
import { ResponseCodes } from "../utils";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await signIn(email, password);

    if (!token) {
      return res.error(ResponseCodes.UNAUTHORIZED, "Invalid credentials");
    }

    return res.success({ token });
  } catch (e) {
    res.error(ResponseCodes.INTERNAL_SERVER_ERROR, e);
  }
};
