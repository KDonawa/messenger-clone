"use client";

import { BaseChat } from "../../utils/getChats";
import ChatCard from "./ChatCard";
import ListPanel from "../ListPanel";
import { useCheckForOpenChat } from "../../hooks/useCheckForOpenChat";
import { use } from "react";

type Props = {
  chatsPromise: Promise<BaseChat[]>;
};

export default function ChatsList({ chatsPromise }: Props) {
  const chats = use(chatsPromise);
  const { isOpen, chatId } = useCheckForOpenChat();

  return (
    <ListPanel title="Chats" isOpen={!isOpen}>
      {chats.map((chat) => {
        return (
          <ChatCard key={chat.id} chat={chat} isSelected={chatId === chat.id} />
        );
      })}
    </ListPanel>
  );
}
