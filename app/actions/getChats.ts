import prisma from "@/app/lib/prisma";
import { Prisma } from ".prisma/client";
import { getCurrentUser, userSelect } from "./getCurrentUser";

const chatInclude = Prisma.validator<Prisma.ChatInclude>()({
  users: { select: userSelect },
});

export type BaseChat = Prisma.ChatGetPayload<{
  include: typeof chatInclude;
}>;

export const getChats = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return [];

  try {
    const chats = await prisma.chat.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
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
