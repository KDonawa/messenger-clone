import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { registerSchema } from "@/app/(features)/auth/validators";
import { Prisma } from "@prisma/client";

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
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return new NextResponse("Email already exists.", { status: 400 });
      }
    }
    console.error(e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
