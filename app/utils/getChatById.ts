import prisma from "@/app/lib/prisma";
import { Prisma } from ".prisma/client";
import { userSelect } from "./getCurrentUser";

const chatInclude = Prisma.validator<Prisma.ChatInclude>()({
  users: { select: userSelect },
  messages: {
    include: {
      sender: { select: userSelect },
      seenBy: { select: userSelect },
    },
  },
});

export type ChatWithMessages = Prisma.ChatGetPayload<{
  include: typeof chatInclude;
}>;

export const getChatById = async (chatId: string) => {
  try {
    const chat = await prisma.chat.findUnique({
      // orderBy: {
      //   lastMessageAt: "desc",
      // },
      where: {
        id: chatId,
      },
      include: chatInclude,
    });

    return chat;
  } catch (error) {
    console.log("🚀 ~ getChatById ~ error:", error);
    return null;
  }
};
