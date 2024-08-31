import bcrypt from "bcrypt";

export const bcryptHash = (str: string): Promise<string> =>
  bcrypt.hash(str, Number(process.env.HASH_KEY));

export const bcryptCompare = (str: string, hash: string): Promise<boolean> =>
  bcrypt.compare(str, hash);
