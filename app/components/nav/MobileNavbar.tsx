"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { BsFillChatFill, BsPeopleFill } from "react-icons/bs";

type Props = {
  className?: string;
};

export default function MobileNavbar({ className }: Props) {
  return (
    <nav className={className}>
      <ul className="flex h-full">
        <NavLink name="Chats" path="/chats" icon={BsFillChatFill} />

        <NavLink name="People" path="/users" icon={BsPeopleFill} />
      </ul>
    </nav>
  );
}

type LinkProps = {
  name: string;
  path: string;
  icon: IconType;
};

function NavLink({ name, path, icon: Icon }: LinkProps) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(path);

  return (
    <li
      className={clsx("flex flex-1 justify-center", isActive && "bg-gray-100")}
    >
      <Link
        href={path}
        className="flex flex-1 flex-col items-center justify-center "
      >
        <Icon
          className={clsx("h-4 w-4", isActive ? "text-blue-500" : "opacity-70")}
        />
        <span
          className={clsx(
            "text-sm font-semibold",
            isActive ? "text-blue-500" : "opacity-70",
          )}
        >
          {name}
        </span>
      </Link>
    </li>
  );
}
