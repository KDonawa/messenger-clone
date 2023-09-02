import prisma from "@/app/lib/prisma";
import { getSessionUser } from "@/app/utils/getSessionUser";
import { userSelect } from "./getCurrentUser";

export const getUsers = async () => {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser?.email) return [];

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { NOT: { email: sessionUser.email } },
      select: userSelect,
    });

    return users;
  } catch (e) {
    console.log("getUsers error:", e);
    return [];
  }
};
