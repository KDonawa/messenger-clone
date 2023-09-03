import ListPanel from "@/app/components/ListPanel";
import ListSkeleton from "@/app/components/ListSkeleton";
import UsersList from "@/app/components/users/UsersList";
import { getUsers } from "@/app/actions/getUsers";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function UsersLayout({
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
