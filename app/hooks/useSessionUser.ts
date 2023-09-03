// import { Session, User } from "next-auth";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { SessionUser } from "@/app/types";

export const useSessionUser = () => {
  const session = useSession();

  const sessionUser: SessionUser = useMemo(() => {
    return session.data?.user
      ? session.data.user
      : {
          id: "",
        };
  }, [session.data?.user]);

  return sessionUser;
};
