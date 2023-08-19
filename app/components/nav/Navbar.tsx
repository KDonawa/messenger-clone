"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "../Avatar";
import { IconType } from "react-icons";
import { PiWechatLogoFill, PiUsersThreeFill } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";
// import { getCurrentUser } from "../utils/getCurrentUser";

type Props = {
  className?: string;
};

export default function Navbar({ className }: Props) {
  // const currentUser = await getCurrentUser();

  return (
    <nav className={clsx("", className)}>
      <Image
        height={30}
        width={30}
        src={"/images/logo.png"}
        alt="Logo"
        className="ml-5"
      />

      <ul className="mt-8 flex flex-col">
        <NavLink name="Chats" path="/chats" icon={PiWechatLogoFill} />

        <NavLink name="People" path="/users" icon={PiUsersThreeFill} />
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between px-4">
        <Avatar user={null} />

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => signOut()}
          className="rounded-full p-2 hover:bg-gray-100 hover:text-blue-600"
        >
          <CiLogout className="h-6 w-6" />
        </button>
      </div>
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
    <li className="rounded-md hover:bg-gray-100">
      <Link href={path} className="flex flex-wrap items-center gap-5 py-3 pl-5">
        <Icon
          className={clsx("h-6 w-6", isActive ? "text-blue-500" : "opacity-70")}
        />
        <span
          className={clsx(
            "font-semibold",
            isActive
              ? "bg-gradient-to-r from-blue-500 to-fuchsia-400 bg-clip-text font-semibold text-transparent"
              : "opacity-70",
          )}
        >
          {name}
        </span>
      </Link>
    </li>
  );
}
