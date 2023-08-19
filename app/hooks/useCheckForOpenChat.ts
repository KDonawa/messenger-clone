import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useCheckForOpenChat = () => {
  const params = useParams();

  const chatId = useMemo(() => {
    return params.chatId ? (params.chatId as string) : "";
  }, [params.chatId]);

  const isOpen = Boolean(chatId);

  return { isOpen, chatId };
};
