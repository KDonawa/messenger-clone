import { createMessage } from "@/app/actions/createMessage";
import { getSessionUser } from "@/app/utils/getSessionUser";
import { messageFormSchema } from "@/app/utils/validators";
import { NextResponse } from "next/server";

export type PostMessagesResult = Awaited<ReturnType<typeof createMessage>>;

export async function POST(request: Request) {
  try {
    // check if user making request is authenticated
    const sessionUser = await getSessionUser();
    if (!sessionUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    // validate request body
    const parsedBody = messageFormSchema.safeParse(body);
    if (!parsedBody.success) {
      return new NextResponse("Invalid info", { status: 400 });
    }

    await createMessage({
      ...parsedBody.data,
      senderId: sessionUser.id,
    });

    return new NextResponse("Success", { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
