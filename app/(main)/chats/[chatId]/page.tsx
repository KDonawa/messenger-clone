import ChatDetails from "@/app/components/chats/ChatDetails";
import { getChatById } from "@/app/actions/getChatById";
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};
export default async function Page({ params: { chatId } }: Props) {
  const chat = await getChatById(chatId);

  if (!chat) return redirect("/chats");

  return <ChatDetails chat={chat} />;
}
