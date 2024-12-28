import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserProfile } from "@/components/global/UserProfile";
import { Button } from "@/components/ui/button";
import { verifyToken } from "../actions";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserData } from "@/lib/getUserData";
import { getUserPlaces } from "@/lib/getUserPlaces";

async function Navbar() {
  const isAuthenticated = await verifyToken();
  if (isAuthenticated) {
    const { pk } = await getUserData();
    var places = await getUserPlaces(pk);
  }

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
      <Link href="/builder">ساخت منو جدید</Link>

      {/* for testing purposes */}
      <Link href="/venhan/menu">صفحه منو</Link>

      <Link href="/builder/setup">معرفی</Link>
      {isAuthenticated ? (
        <Link href={`/dashboard/${places[0].menu_id}/insights`}>داشبورد</Link>
      ) : (
        <Link href={`/register`}>داشبورد</Link>
      )}
      <Link href="/">درباره ما</Link>
      <div className="flex gap-2">
        <Suspense fallback={<Skeleton className="h-10 w-10" />}>
          {isAuthenticated ? (
            <UserProfile></UserProfile>
          ) : (
            <Button className="text-lg" asChild>
              <Link href="/register">ورود | ثبت نام</Link>
            </Button>
          )}
        </Suspense>
      </div>
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
