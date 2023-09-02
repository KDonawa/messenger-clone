import ChatsList from "@/app/components/chats/ChatsList";
import ListPanel from "@/app/components/ListPanel";
import ListSkeleton from "@/app/components/ListSkeleton";
import { getChats } from "@/app/actions/getChats";
import { Suspense } from "react";

export default async function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatsPromise = getChats();

  return (
    <>
      {/* List Section*/}
      <Suspense
        fallback={
          <ListPanel title="Chats">
            <ListSkeleton />
          </ListPanel>
        }
      >
        {/* <ChatsList /> */}
        <ChatsList chatsPromise={chatsPromise} />
      </Suspense>

      {/* Details Section */}
      {children}
    </>
  );
}
