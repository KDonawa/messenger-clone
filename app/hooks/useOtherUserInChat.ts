import { useSession } from "next-auth/react";
import { BaseUser } from "../utils/getCurrentUser";
import { useMemo } from "react";

export const useOtherUserInChat = (users: BaseUser[]) => {
  const session = useSession();

  return useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUsers = users.filter((user) => user.email != currentUserEmail);

    return otherUsers[0];
  }, [session.data?.user?.email, users]);
};
