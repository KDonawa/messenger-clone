"use client";

import clsx from "clsx";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  children: React.ReactNode;
  provider: string;
};

export default function SocialLoginButton({ children, provider }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const socialLogin = async (provider: string) => {
    setIsLoading(true);

    const result = await signIn(provider);

    if (result?.error) {
      toast.error(result.error);
    }

    setIsLoading(false);
  };

  return (
    <button
      type="button"
      className={clsx(
        "flex items-center justify-center rounded-sm px-3 py-2 text-gray-400 ring-1 ring-gray-400 disabled:opacity-50",
        !isLoading && "hover:text-blue-500 hover:ring-blue-500",
      )}
      onClick={() => socialLogin(provider)}
      disabled={isLoading}
    >
      {children}
    </button>
  );
}
