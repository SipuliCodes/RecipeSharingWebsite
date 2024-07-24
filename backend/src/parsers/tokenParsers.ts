import { isString } from "./parserHelpers";

export const parseSecret = (secret: unknown): string => {
  if (!secret || !isString(secret)) {
    throw new Error("Missing secret");
  }

  return secret;
};
