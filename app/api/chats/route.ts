import { getCurrentUser, userSelect } from "@/app/utils/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { postChatSchema } from "@/app/utils/validators";

export type ChatsPostResult = Awaited<ReturnType<typeof postChat>>;

async function postChat(currentUserId: string, otherUserId: string) {
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

export async function POST(request: Request) {
  try {
    // check if user making request is authenticated
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    // validate request body
    const body = await request.json();
    const result = postChatSchema.safeParse(body);
    if (!result.success) {
      return new NextResponse("Invalid info", { status: 400 });
    }

    const chat = await postChat(currentUser.id, result.data.userId);

    return NextResponse.json(chat);
  } catch (error) {
    // console.log("🚀 ~ POST ~ error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
