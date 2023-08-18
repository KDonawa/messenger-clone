import SignOutButton from "./(features)/auth/SignOutButton";

export default async function Home() {
  return (
    <main>
      <h1>Active Session</h1>
      <SignOutButton />
    </main>
  );
}
