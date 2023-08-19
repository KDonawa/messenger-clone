"use client";

import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

type AuthType = "login" | "register";

export default function AuthPage() {
  const [type, setType] = useState<AuthType>("login");

  return (
    <div className="flex w-5/12 flex-col gap-5">
      <h1>Hang out anytime, anywhere</h1>
      <p>
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
