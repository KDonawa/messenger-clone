import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const deleteChats = prisma.chat.deleteMany();
  const deleteAccounts = prisma.account.deleteMany();
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteChats, deleteAccounts, deleteUsers]);

  const hashedPassword = await hash("1234", 12);

  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test User",
      hashedPassword,
    },
  });
  console.log({ user });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
