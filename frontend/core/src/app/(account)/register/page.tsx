"use client";

import LoginBanner from "./components/Banner";

import { InputForm } from "./components/RegisterForm";
import { CredentialForm } from "./components/CredentialForm";
import { useState } from "react";
import { OtpForm } from "./components/OtpForm";

type currentFormType =
  | "credentialForm"
  | "otpForm"
  | "phoneNumberPasswordForm"
  | "emailPasswordForm";

export default function Register() {
  const [currentForm, setCurrentForm] =
    useState<currentFormType>("credentialForm");

  return (
    <section className="container flex h-screen w-full flex-col items-center justify-center gap-7 px-4 lg:w-5/12 lg:px-24">
      <div className="flex w-full flex-col gap-2 text-right">
        <h1 className="text-3xl font-black text-royal-green">ورود | ثبت نام</h1>
        <p className="text-royal-green-light">
          لطفا ایمیل یا شماره تلفن خود را وارد کنید
        </p>
      </div>
      <CredentialForm></CredentialForm>
    </section>
  );
}
