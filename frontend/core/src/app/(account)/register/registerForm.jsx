"use client";

import { useState } from "react";
import { TextInput } from "@/app/components/inputs";
import handleSubmit from "@/app/lib/handleSubmit";
import SixDigitInput from "./components/sixDigitInput";

export default function LoginForm() {
  const [userCredential, setUserCredential] = useState("");

  var isPhoneNumber = /^-?\d+$/.test(userCredential);
  var obj = {};

  const submitForm = (e) => {
    e.preventDefault();

    //check if the input value is phoneNumber(only numbers) or email
    // create data object
    if (isPhoneNumber) {
      obj["phone_number"] = userCredential;
    } else {
      obj["email"] = userCredential;
    }
    handleSubmit(obj, "http://127.0.0.1:8000/api/");
  };

  return (
    <form onSubmit={submitForm} className="flex w-[400px] flex-col gap-7">
      <div className="flex flex-col gap-4">
        <TextInput
          value={userCredential}
          setValue={(e) => setUserCredential(e.target.value)}
        ></TextInput>
        <SixDigitInput
          userCredential={userCredential}
          isPhoneNumber={isPhoneNumber}
        ></SixDigitInput>
      </div>
      <button
        className="rounded-lg border-2 bg-royal-green/80 px-[12px] py-4 text-lg font-semibold text-sky-blue transition-all duration-300 ease-out hover:scale-105 hover:bg-royal-green"
        type="submit"
      >
        ارسال کد یک بار مصرف
      </button>
    </form>
  );
}
