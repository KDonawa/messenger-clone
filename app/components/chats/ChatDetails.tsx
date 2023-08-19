"use client";

import { useOtherUserInChat } from "../../hooks/useOtherUserInChat";
import { ChatWithMessages } from "../../utils/getChatById";
import Avatar from "../Avatar";
import { BsThreeDots } from "react-icons/bs";
import { HiChevronLeft } from "react-icons/hi";
import MainPanel from "../MainPanel";
import Link from "next/link";
import ChatBubble from "./ChatBubble";

type Props = {
  chat: ChatWithMessages;
};

export default function ChatDetails({ chat }: Props) {
  const otherUser = useOtherUserInChat(chat.users);

  return (
    <MainPanel>
      <div className="flex h-full flex-col">
        {/* HEADER SECTION */}
        <div className="flex items-center gap-4 border-b-[1px] px-4 pb-4 pt-4">
          <Link href="/chats" className="p-1 text-blue-500 sm:hidden">
            <HiChevronLeft size={28} />
          </Link>

          <Avatar user={otherUser} />

          <div className="text-sm font-semibold">{otherUser.name}</div>

          <button className="ml-auto rounded-full bg-blue-400 bg-opacity-50 p-1.5 hover:bg-gray-300">
            <BsThreeDots className="h-4 w-4 text-blue-600" />
          </button>
        </div>

        {/* MESSAGES SECTION */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto border-b-2 p-0.5 sm:p-4">
          <ChatBubble />
          <ChatBubble isCurrentUser={false} />
          <ChatBubble />
          <ChatBubble isCurrentUser={false} />
          <ChatBubble />
          <ChatBubble isCurrentUser={false} />
          <ChatBubble />
          <ChatBubble isCurrentUser={false} />
          <ChatBubble />
          <ChatBubble isCurrentUser={false} />
          <ChatBubble />
          <ChatBubble isCurrentUser={false} />
        </div>

        {/* INPUT SECTION */}
        <form
          onSubmit={() => {
            console.log("sent message");
          }}
          className="px-5 py-1"
        >
          <input
            type="text"
            placeholder="Write something..."
            className="w-full rounded-full bg-gray-200 px-3 py-2 text-sm outline-none disabled:opacity-50"
          />
        </form>
      </div>
    </MainPanel>
  );
}
