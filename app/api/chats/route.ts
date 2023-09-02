import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { postChatSchema } from "@/app/utils/validators";
import { createChat } from "@/app/actions/createChat";

export type ChatsPostResult = Awaited<ReturnType<typeof createChat>>;

export async function POST(request: Request) {
  try {
    // check if user making request is authenticated
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // validate request body
    const body = await request.json();
    const result = postChatSchema.safeParse(body);
    if (!result.success) {
      return new NextResponse("Invalid info", { status: 400 });
    }

    const chat = await createChat(currentUser.id, result.data.userId);

    return NextResponse.json(chat);
  } catch (error) {
    // console.log("🚀 ~ POST ~ error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
