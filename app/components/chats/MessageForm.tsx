import { PostMessagesResult } from "@/app/api/messages/route";
import { MessageFormSchema } from "@/app/utils/validators";
import axios from "axios";
import clsx from "clsx";
import React, { useLayoutEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";

type Props = {
  chatId: string;
};

export default function MessageForm({ chatId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textArea = textAreaRef?.current;
    if (textArea) {
      // Reset height - important to shrink on delete
      textArea.style.height = "inherit";

      // Set height
      textArea.style.height = `${Math.max(textArea.scrollHeight, 36)}px`;
    }
  }, [text]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const body: MessageFormSchema = {
      text: text.trim(),
      chatId,
    };

    try {
      await axios.post<PostMessagesResult>("/api/messages", body);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error("Something went wrong!");
    }

    setText("");
    setIsLoading(false);
  }

  const canSubmit = !isLoading && Boolean(text.replaceAll("\n", "").length);

  return (
    <form onSubmit={handleSubmit} className="flex flex-shrink-0 px-5 py-1">
      <textarea
        ref={textAreaRef}
        rows={1}
        placeholder="Write something..."
        className="w-full overflow-y-hidden rounded-xl bg-gray-200 px-6 py-2 text-sm outline-none disabled:opacity-50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />

      <button
        type="submit"
        className={clsx(
          "flex-shrink-0 px-2 text-blue-600",
          canSubmit ? "block" : "hidden",
        )}
      >
        <IoSend className="h-6 w-6" />
      </button>
    </form>
  );
}
