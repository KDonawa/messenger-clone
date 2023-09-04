import prisma from "@/app/lib/prisma";
import { getSessionUser } from "@/app/utils/getSessionUser";
import { Prisma } from ".prisma/client";

export const userSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  name: true,
  image: true,
});

export type BaseUser = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

export const getCurrentUser = async () => {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: { email: sessionUser.email },
      select: userSelect,
    });

    return currentUser;
  } catch (e) {
    console.log("getCurrentUser error:", e);
    return null;
  }
};
