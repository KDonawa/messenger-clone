"use client";

import clsx from "clsx";
import MainPanel from "@/app/components/MainPanel";
import Avatar from "@/app/components/Avatar";
import { useStore } from "@/app/lib/store";
import Image from "next/image";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { HiChevronLeft } from "react-icons/hi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ChatsPostResult } from "@/app/api/chats/route";

export default function UsersPage() {
  const router = useRouter();
  const selectedUser = useStore((state) => state.selectedUser);
  const setSelectedUser = useStore((state) => state.setSelectedUser);

  async function handleSendButtonClick(userId: string) {
    try {
      const { data } = await axios.post<ChatsPostResult>("/api/chats", {
        userId,
      });
      router.push(`/chats/${data.id}`);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <MainPanel className={clsx(!selectedUser && "hidden sm:block")}>
      <div className="flex h-full flex-col">
        {selectedUser ? (
          // DETAILS SHOWN WHEN A USER IS SELECTED
          <>
            {/* Header Section */}
            <div className="border-b-[1px] px-4 pb-4 pt-4 sm:hidden">
              {/* Back button */}
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="text-blue-500"
              >
                <HiChevronLeft size={28} />
              </button>
            </div>

            {/* User Profile Section */}
            <div className="flex h-5/6 flex-col items-center justify-center gap-5">
              <Avatar user={selectedUser} width={150} height={150} />

              <div className="text-center">
                <div>{selectedUser.name}</div>
                <div className="text-sm opacity-50">{selectedUser.email}</div>
              </div>

              {/* Send Message Button */}
              <button
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 hover:text-blue-600"
                onClick={() => handleSendButtonClick(selectedUser.id)}
              >
                <BiSolidMessageRoundedDetail className="inline-block h-7 w-7" />
                <p className="text-sm opacity-75">Send Message</p>
              </button>
            </div>
          </>
        ) : (
          // DEFAULT PAGE WHEN NO USER SELECTED
          <div className="flex h-full flex-col items-center justify-center gap-y-10 bg-gradient-to-r from-blue-500 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent">
            <Image
              height={50}
              width={50}
              src={"/images/logo.png"}
              alt="Logo"
              className="mb-6 ml-3 mt-3"
            />
            <p className="px-3 text-center">Select a user to view profile</p>
          </div>
        )}
      </div>
    </MainPanel>
  );
}
