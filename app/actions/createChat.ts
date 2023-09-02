import prisma from "@/app/lib/prisma";

export async function createChat(currentUserId: string, otherUserId: string) {
  // find existing chat
  const existingChat = await prisma.chat.findFirst({
    where: {
      OR: [
        { userIds: { equals: [currentUserId, otherUserId] } },
        { userIds: { equals: [otherUserId, currentUserId] } },
      ],
    },
    select: {
      id: true,
    },
  });
  // console.log("🚀 ~ POST ~ existingChat:", existingChat);
  if (existingChat) {
    return existingChat;
  }

  // or create a new chat
  const newChat = await prisma.chat.create({
    data: {
      users: {
        connect: [{ id: currentUserId }, { id: otherUserId }],
      },
    },
    select: {
      id: true,
    },
  });
  // console.log("🚀 ~ POST ~ newChat:", newChat);

  return newChat;
}
