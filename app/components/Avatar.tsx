import React from "react";
import Image from "next/image";
import { BaseUser } from "../actions/getCurrentUser";

type Props = {
  user?: BaseUser | null;
  width?: number;
  height?: number;
};

export default function Avatar({ user, width = 36, height = 36 }: Props) {
  // const isOnline = true;

  return (
    <div className="relative">
      <Image
        width={width}
        height={height}
        src={user?.image || "/images/placeholder.jpg"}
        alt="Avatar"
        className="overflow-hidden rounded-full"
      />

      {/* {isOnline && (
        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-gray-50" />
      )} */}
    </div>
  );
}
