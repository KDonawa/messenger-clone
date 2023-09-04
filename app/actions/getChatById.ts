import prisma from "@/app/lib/prisma";
import { Prisma } from ".prisma/client";
import { userSelect } from "./getCurrentUser";

const messageInclude = Prisma.validator<Prisma.MessageInclude>()({
  sender: { select: userSelect },
});
export type MessagePayload = Prisma.MessageGetPayload<{
  include: typeof messageInclude;
}>;

const chatInclude = Prisma.validator<Prisma.ChatInclude>()({
  users: { select: userSelect },
  messages: {
    include: messageInclude,
  },
});
export type ChatPayload = Prisma.ChatGetPayload<{
  include: typeof chatInclude;
}>;

export const getChatById = async (chatId: string) => {
  try {
    const chat = await prisma.chat.findUnique({
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
