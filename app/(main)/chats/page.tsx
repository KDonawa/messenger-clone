"use client";

import MainPanel from "@/app/components/MainPanel";
import { useCheckForOpenChat } from "@/app/hooks/useCheckForOpenChat";
import clsx from "clsx";
import Image from "next/image";

export default function ChatsPage() {
  const { isOpen } = useCheckForOpenChat();

  return (
    <MainPanel className={clsx(!isOpen && "hidden sm:block")}>
      <div className=" flex h-full flex-col items-center justify-center gap-y-10  bg-gradient-to-r from-blue-500 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent">
        <Image
          height={50}
          width={50}
          src={"/images/logo.png"}
          alt="Logo"
          className="mb-6 ml-3 mt-3"
        />
        <p className="px-3 text-center">Select a user to start chatting</p>
      </div>
    </MainPanel>
  );
}
