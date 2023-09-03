import { User } from "next-auth";

export type SessionUser = User & {
  id: string;
};
