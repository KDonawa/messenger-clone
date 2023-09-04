"use client";

import { useOtherUserInChat } from "@/app/hooks/useOtherUserInChat";
import { ChatPayload, MessagePayload } from "@/app/actions/getChatById";
import Avatar from "../Avatar";
import { BsThreeDots } from "react-icons/bs";
import { HiChevronLeft } from "react-icons/hi";
import MainPanel from "../MainPanel";
import Link from "next/link";
import ChatBubble from "./ChatBubble";
import { useEffect, useRef, useState } from "react";
import MessageForm from "./MessageForm";
import { useSessionUser } from "@/app/hooks/useSessionUser";
import { pusherClient } from "@/app/lib/pusher";

type Props = {
  chat: ChatPayload;
};

export default function ChatDetails({ chat }: Props) {
  const sessionUser = useSessionUser();
  const otherUser = useOtherUserInChat(chat.users);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(chat.messages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const messageHandler = (newMessage: MessagePayload) => {
      setMessages((current) => {
        const messageExists = Boolean(
          messages.find((message) => message.id === newMessage.id),
        );
        return messageExists ? current : [...current, newMessage];
      });
    };

    pusherClient.subscribe(chat.id);
    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(chat.id);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [messages, chat.id]);

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

        {/* MESSAGES DISPLAY */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto border-b-2 p-2 sm:p-4">
          {messages.map((message) => {
            return (
              <ChatBubble
                key={message.id}
                isCurrentUser={message.senderId === sessionUser.id}
                content={message.body}
                owner={message.sender}
                time={message.createdAt}
              />
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* INPUT SECTION */}
        <MessageForm chatId={chat.id} />
      </div>
    </MainPanel>
  );
}
