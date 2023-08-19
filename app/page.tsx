import { redirect } from "next/navigation";
import AuthPage from "./components/auth/AuthPage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/chats");
  }
  return (
    <div className="flex h-full justify-center p-10">
      <AuthPage />
    </div>
  );
}
