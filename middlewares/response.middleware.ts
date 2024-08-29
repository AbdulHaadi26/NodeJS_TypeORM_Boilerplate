import { NextFunction, Request, Response } from "express";
import { PREDEFINED_RESPONSE_TEXTS, ResponseCodes } from "../utils";

declare global {
  namespace Express {
    interface Response {
      success: (data: any, status?: number) => void;
      error: (status: number, error: any) => void;
    }
  }
}

export function responseFormatter(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.success = (data: any, status: number = ResponseCodes.SUCCESS): void => {
    res.status(status).json({
      status,
      data,
    });
  };

  res.error = (status: number, error: any): void => {
    console.log(error);

    const predefinedText = PREDEFINED_RESPONSE_TEXTS[status];

    res.status(status).json({
      status,
      message: predefinedText ?? error?.message ?? "An error occurred",
    });
  };

  next();
}
