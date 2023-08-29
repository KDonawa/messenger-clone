"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormInput, registerSchema } from "@/app/utils/validators";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import clsx from "clsx";
import { BsGoogle } from "react-icons/bs";
import SocialLoginButton from "./SocialLoginButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  toggle: () => void;
};

export default function RegisterForm({ toggle }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    setIsLoading(true);

    try {
      // attempt to register user
      await axios.post("http://localhost:3000/api/auth/register", data); // register user

      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      // check if sign in was successful
      if (result?.error) {
        toast.error(result.error);
      } else {
        router.push("/chats");
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 400) {
        toast.error(e.response.data);
      } else {
        toast.error("Something went wrong!");
      }
    }

    setIsLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* NAME */}
      <div>
        <input
          className={clsx(
            "w-full rounded-lg bg-gray-100 px-3 py-1 outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50",
            errors.email && "focus:ring-red-500",
          )}
          {...register("name")}
          placeholder="Name"
          type="text"
          disabled={isLoading}
        />
        {errors.name?.message && (
          <p className="ml-2 mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <input
          className={clsx(
            "w-full rounded-lg bg-gray-100 px-3 py-1 outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50",
            errors.email && "focus:ring-red-500",
          )}
          {...register("email")}
          placeholder="Email"
          type="email"
          disabled={isLoading}
        />
        {errors.email?.message && (
          <p className="ml-2 mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <input
          className={clsx(
            "w-full rounded-lg bg-gray-100 px-3 py-1 outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50",
            errors.email && "focus:ring-red-500",
          )}
          {...register("password")}
          placeholder="Password"
          type="password"
          disabled={isLoading}
        />
        {errors.password?.message && (
          <p className="ml-2 mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* SIGN UP W/ CREDENTIALS*/}
      <div className="flex flex-wrap items-center gap-3">
        <button
          className={clsx(
            "mr-auto rounded-full bg-blue-500 px-5 py-2 font-semibold text-white disabled:opacity-50",
            !isLoading && "hover:bg-blue-600",
          )}
          type="submit"
          disabled={isLoading}
        >
          Sign up
        </button>

        <p className="text-sm text-gray-500 ">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-blue-500"
            onClick={toggle}
          >
            Sign in
          </button>
        </p>
      </div>

      <div className="flex items-center text-sm">
        <div className="flex-1 border-t-2 border-black opacity-5"></div>
        <span className="mx-1 flex-shrink opacity-50">or continue with</span>
        <div className="flex-1 border-t-2 border-black opacity-5"></div>
      </div>

      {/* SIGN UP W/ SOCIALS*/}
      <SocialLoginButton provider={"google"}>
        <BsGoogle />
      </SocialLoginButton>
    </form>
  );
}
