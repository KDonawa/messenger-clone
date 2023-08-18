import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { registerSchema } from "@/app/validators/auth";

export async function POST(req: Request) {
  const body = await req.json();

  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return new NextResponse("Invalid info", { status: 400 });
  }

  const { name, email, password } = result.data;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
