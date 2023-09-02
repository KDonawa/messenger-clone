import { createMessage } from "@/app/actions/createMessage";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { messageFormSchema } from "@/app/utils/validators";
import { NextResponse } from "next/server";

export type PostMessagesResult = Awaited<ReturnType<typeof createMessage>>;

export async function POST(request: Request) {
  try {
    // check if user making request is authenticated
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    // validate request body
    const result = messageFormSchema.safeParse(body);
    if (!result.success) {
      return new NextResponse("Invalid info", { status: 400 });
    }

    const newMessage = await createMessage(result.data);

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
