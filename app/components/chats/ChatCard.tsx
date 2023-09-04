"use client";

import Avatar from "@/app/components/Avatar";
import clsx from "clsx";
import { BaseChat } from "../../actions/getChats";
import { format } from "date-fns";
import { useOtherUserInChat } from "../../hooks/useOtherUserInChat";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MessagePayload } from "@/app/actions/getChatById";
import { pusherClient } from "@/app/lib/pusher";

type Props = {
  chat: BaseChat;
  isSelected?: boolean;
};

export default function ChatCard({ chat, isSelected = false }: Props) {
  const router = useRouter();
  const otherUser = useOtherUserInChat(chat.users);
  const [lastMessageInfo, setLastMessageInfo] = useState({
    text: chat.lastMessageText,
    time: chat.lastMessageAt,
  });

  useEffect(() => {
    const messageHandler = (newMessage: MessagePayload) => {
      setLastMessageInfo({
        text: newMessage.body,
        time: newMessage.createdAt,
      });
    };

    pusherClient.subscribe(chat.id);
    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(chat.id);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [chat.id]);

  function handleClick() {
    router.push(`/chats/${chat.id}`);
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-3",
        isSelected ? "bg-slate-900 text-white" : "hover:bg-gray-100",
      )}
    >
      <Avatar user={otherUser} />

      <div className="flex-1">
        <p>{otherUser.name}</p>
        <div className="grid grid-cols-6">
          <span className="col-span-4 overflow-hidden text-ellipsis whitespace-nowrap text-xs opacity-70">
            {lastMessageInfo.text || "Start a conversation"}
          </span>

          {lastMessageInfo.time && (
            <span
              className={clsx(
                "col-span-2 justify-self-end text-[.6rem] opacity-70",
                isSelected && "text-cyan-400",
              )}
            >
              {format(new Date(lastMessageInfo.time), "p")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
