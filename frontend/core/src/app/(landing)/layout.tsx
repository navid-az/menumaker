import Link from "next/link";
import Image from "next/image";
import UserProfile from "@/components/global/UserProfile";
import React from "react";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="container mx-auto flex w-full items-center justify-between pt-7 text-xl text-royal-green">
      <Link href="/">
        <Image
          src="/images/menumaker-logo.svg"
          width={166}
          height={50}
          alt="menu maker logo"
        />
      </Link>
      <Link href="/pricing">تعرفه ها</Link>
      <Link href="/builder">مشاهده دمو</Link>
      <Link href="/1/menu">صفحه منو</Link>
      <Link href="/dashboard/liveManagement">داشبورد</Link>

      <Link href="/">درباره ما</Link>

      <Button size="lg" className="text-lg" asChild>
        <Link href="/register">ثبت نام</Link>
      </Button>
      {/* <UserProfile></UserProfile> */}
    </nav>
  );
}

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
}
