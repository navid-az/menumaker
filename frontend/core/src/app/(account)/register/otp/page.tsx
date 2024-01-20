import React from "react";
import { OtpForm } from "../components/OtpForm";

export default function OtpFormPage() {
  return (
    <section className="container flex h-screen w-full flex-col items-center justify-center gap-7 px-4 lg:w-5/12 lg:px-24">
      <div className="flex w-full flex-col gap-2 text-right">
        <h1 className="text-3xl font-black text-royal-green">خوش آمدید</h1>
        <p className="text-royal-green-light">
          کد ارسال شده به شماره موبایل خود را وارد کنید
        </p>
      </div>
      <OtpForm length={6}></OtpForm>
    </section>
  );
}
