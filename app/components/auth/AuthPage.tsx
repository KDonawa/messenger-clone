"use client";

import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

type Props = {};

type Variant = "login" | "register";

export default function AuthPage({}: Props) {
  const [variant, setVariant] = useState<Variant>("login");

  return (
    <div className="w-5/12 flex flex-col gap-5">
      <h1>Hang out anytime, anywhere</h1>
      <p>
        Messenger makes it easy and fun to stay close to your favorite people.
      </p>

      {variant === "login" ? (
        <LoginForm toggle={() => setVariant("register")} />
      ) : (
        <RegisterForm toggle={() => setVariant("login")} />
      )}
    </div>
  );
}
