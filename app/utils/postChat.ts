import axios from "axios";
import { ChatsPostResult } from "../api/chats/route";

export async function postChat(userId: string) {
  const { data } = await axios.post<ChatsPostResult>("/api/chats", {
    userId,
  });
  return data;
}
