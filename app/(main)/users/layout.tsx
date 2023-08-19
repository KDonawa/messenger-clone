import ListPanel from "@/app/components/ListPanel";
import ListSkeleton from "@/app/components/ListSkeleton";
import UsersList from "@/app/components/users/UsersList";
import { getUsers } from "@/app/utils/getUsers";
import { Suspense } from "react";

export default async function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usersPromise = getUsers();

  return (
    <>
      {/* List Section*/}
      <Suspense
        fallback={
          <ListPanel title="Users">
            <ListSkeleton />
          </ListPanel>
        }
      >
        <UsersList usersPromise={usersPromise} />
      </Suspense>

      {/* Details Section */}
      {children}
    </>
  );
}
