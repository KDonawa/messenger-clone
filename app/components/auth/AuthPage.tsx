"use client";

import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

type AuthType = "login" | "register";

export default function AuthPage() {
  const [type, setType] = useState<AuthType>("login");

  return (
    <div className="flex w-96 flex-col gap-7">
      <h1 className="bg-gradient-to-r from-blue-500 to-fuchsia-400 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
        Hang out anytime, anywhere
      </h1>
      <p className="opacity-70">
        Messenger makes it easy and fun to stay close to your favorite people.
      </p>

      {type === "login" ? (
        <LoginForm toggle={() => setType("register")} />
      ) : (
        <RegisterForm toggle={() => setType("login")} />
      )}
    </div>
  );
}
