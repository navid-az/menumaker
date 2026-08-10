import React from "react";

//components
import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="w-full bg-royal-green relative mt-16">
      <div className="flex flex-col gap-8 md:gap-12 items-center justify-center text-5xl md:text-6xl font-bold py-48">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '100%',
            height: 600,
            background: `radial-gradient(ellipse at center, rgba(148,217,226,0.08) 0%, rgba(82,99,255,0.04) 40%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(148,217,226,0.06) 1px, transparent 2px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />
        <div className="flex flex-col leading-16 items-center justify-center gap-4 md:gap-6 select-none">
          <h2 className="text-soft-blue">فروشگاه خود را</h2>
          <span
            style={{
              background: `linear-gradient(135deg, #94d9e2 0%, #a1fcb5 50%, #5263ff 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="h-16"
          >
            همین الان بسازید
          </span>
          <h4 className="text-soft-blue/40 font-light max-w-5/6 md:max-w-xl text-base md:text-xl text-center leading-6 md:leading-10">
            به جمع رستوران‌ها و کافه‌هایی بپیوندید که با منو میکر تجربه مدیریت را
            متحول کرده‌اند.
          </h4>
        </div>
        <div className="gap-4 flex">
          <Button
            asChild
            className="px-6 py-5 md:px-9 md:py-7 rounded-xl text-sm md:text-xl font-medium bg-soft-blue text-royal-green border-2 border-soft-blue transition-all duration-300 hover:scale-95"
          >
            <Link href={"/builder"}>شروع رایگان!</Link>
          </Button>
          <Button
            asChild
            className="px-6 py-5 md:px-9 md:py-7 rounded-xl text-sm md:text-xl font-medium bg-royal-green text-soft-blue border-2 border-soft-blue/40 hover:bg-sky-blue/15 transition-all duration-300 hover:scale-95"
          >
            <Link href={"/builder"}>مشاهده دمو</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-6 relative items-center py-4 px-4 md:px-16 text-soft-blue bg-primary backdrop-blur-2xl">
        <p className="hidden lg:block text-sm font-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-40 select-none">
          © 1405 منو میکر - تمامی حقوق محفوظ است.
        </p>
        <div className="flex justify-between flex-col sm:flex-row items-start lg:items-center w-full gap-2">
          <Link
            href="/"
            className="relative w-32 h-10 opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            <Logo height={36} primary="#edfdff" secondary="#94D9E2"></Logo>
          </Link>
          <div className="flex w-full sm:w-auto justify-center sm:justify-end">
            <Button className="text-xs lg:text-sm font-light text-soft-blue/40 hover:text-soft-blue transition-colors duration-300">
              حریم خصوصی
            </Button>
            <Button className="text-xs lg:text-sm font-light text-soft-blue/40 hover:text-soft-blue transition-colors duration-300">
              تماس با ما
            </Button>
            <Button className="text-xs lg:text-sm font-light text-soft-blue/40 hover:text-soft-blue transition-colors duration-300">
              درباره ما
            </Button>
          </div>
        </div>
        <p className="lg:hidden text-xs lg:text-sm font-light w-full text-center opacity-40 select-none">
          © 1405 منو میکر — تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
