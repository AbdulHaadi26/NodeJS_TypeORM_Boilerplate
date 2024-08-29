import { ResponseCodeTexts } from "./enums";

export const PREDEFINED_RESPONSE_TEXTS: Record<number, string> = {
  401: ResponseCodeTexts.UNAUTHORIZED,
  500: ResponseCodeTexts.INTERNAL_SERVER_ERROR,
};
