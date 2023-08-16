"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/validators/auth";

type Props = {
  toggle: () => void;
};

type FormInput = z.infer<typeof registerSchema>;

export default function RegisterForm({ toggle }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          className="bg-gray-100 py-1 px-3 rounded-lg outline-none focus:border focus:border-blue-500 w-9/12"
          {...register("name")}
          placeholder="Name"
          type="text"
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm ml-2 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          className="bg-gray-100 py-1 px-3 rounded-lg outline-none focus:border focus:border-blue-500 w-9/12"
          {...register("email")}
          placeholder="Email"
          type="email"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm ml-2 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          className="bg-gray-100 py-1 px-3 rounded-lg outline-none focus:border focus:border-blue-500 w-9/12"
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm ml-2 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        className="bg-blue-500 text-white font-bold rounded-full py-2 px-3 self-start hover:scale-105"
        type="submit"
      >
        Sign up
      </button>

      <p className="text-xs text-gray-500">
        Already have an account?{" "}
        <button className="underline" onClick={toggle}>
          Login
        </button>
      </p>
    </form>
  );
}
