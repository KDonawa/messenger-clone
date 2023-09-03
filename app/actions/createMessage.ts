import { MessageFormSchema } from "../utils/validators";
import prisma from "@/app/lib/prisma";

export async function createMessage({
  text,
  image,
  senderId,
  chatId,
}: MessageFormSchema & { senderId: string }) {
  const timeNow = new Date();

  const update = await prisma.chat.update({
    where: { id: chatId },
    data: {
      lastMessageAt: timeNow,
      lastMessageText: text,
      messages: {
        create: {
          createdAt: timeNow,
          body: text,
          image: image,
          sender: {
            connect: { id: senderId },
          },
        },
      },
    },
  });

  // return update;
}
