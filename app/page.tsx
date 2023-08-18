import { getServerSession } from "next-auth/next";
import AuthPage from "./(features)/auth/AuthPage";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignOutButton from "./(features)/auth/SignOutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      {session ? (
        <div>
          <h1>Active Session</h1>
          <SignOutButton />
        </div>
      ) : (
        <div className="flex h-screen justify-center p-10">
          <AuthPage />
        </div>
      )}
    </main>
  );
}
