import prisma from "@/app/lib/prisma";
import { Prisma } from ".prisma/client";
import { userSelect } from "./getCurrentUser";
import { getSessionUser } from "@/app/utils/getSessionUser";

const chatInclude = Prisma.validator<Prisma.ChatInclude>()({
  users: { select: userSelect },
});

export type BaseChat = Prisma.ChatGetPayload<{
  include: typeof chatInclude;
}>;

export const getChats = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser?.id) return [];

  try {
    const chats = await prisma.chat.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: sessionUser.id,
        },
      },
      include: chatInclude,
    });

    return chats;
  } catch (e) {
    console.log("getConversations ~ error:", e);
    return [];
  }
};
