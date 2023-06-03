"use client";

import { TextInput } from "@/app/components/inputs";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("hello");
  };

  return (
    <form className="flex w-[400px] flex-col gap-7">
      <div className="flex flex-col gap-4">
        <TextInput></TextInput>
        <TextInput type="password"></TextInput>
      </div>
      <button
        onClick={(e) => handleSubmit(e)}
        className="rounded-lg border-2 bg-royale-green/80 px-[12px] py-4 text-lg font-semibold text-sky-blue transition-all duration-300 ease-out hover:scale-105 hover:bg-royale-green"
        type="submit"
      >
        ورود به حساب کاربری
      </button>
    </form>
  );
}
