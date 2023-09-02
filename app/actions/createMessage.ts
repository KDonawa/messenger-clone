import { MessageFormSchema } from "../utils/validators";
import prisma from "@/app/lib/prisma";

export async function createMessage({
  text,
  image,
  senderId,
  chatId,
}: MessageFormSchema) {
  const newMessage = await prisma.message.create({
    data: {
      body: text,
      image: image,
      sender: {
        connect: { id: senderId },
      },
      seenBy: {
        connect: { id: senderId },
      },
      chat: {
        connect: { id: chatId },
      },
    },
    select: {
      id: true,
      body: true,
      createdAt: true,
    },
  });

  await prisma.chat.update({
    where: { id: chatId },
    data: {
      lastMessageAt: newMessage.createdAt,
      lastMessageText: newMessage.body,
      messages: {
        connect: { id: newMessage.id },
      },
    },
    select: {},
  });

  return newMessage;
}
