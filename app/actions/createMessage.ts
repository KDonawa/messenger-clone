import { pusherServer } from "@/app/lib/pusher";
import { MessageFormSchema } from "@/app/utils/validators";
import prisma from "@/app/lib/prisma";
import { MessagePayload } from "./getChatById";
import { userSelect } from "./getCurrentUser";

export async function createMessage({
  text,
  image,
  senderId,
  chatId,
}: MessageFormSchema & { senderId: string }) {
  const newMessage = await prisma.$transaction(async (tx) => {
    // create the new message
    const newMessage: MessagePayload = await tx.message.create({
      data: {
        body: text,
        image: image,
        sender: {
          connect: { id: senderId },
        },
        chat: {
          connect: { id: chatId },
        },
      },
      include: {
        sender: {
          select: userSelect,
        },
      },
    });

    // update the chat with new message
    await tx.chat.update({
      where: { id: chatId },
      data: {
        lastMessageAt: newMessage.createdAt,
        lastMessageText: text,
        messages: {
          connect: { id: newMessage.id },
        },
      },
      select: {
        id: true,
      },
    });

    return newMessage;
  });

  await pusherServer.trigger(chatId, "messages:new", newMessage);
}
