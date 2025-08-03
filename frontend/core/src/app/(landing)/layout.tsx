import React, { Suspense } from "react";

//components
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/global/UserProfile";

//actions and functions
import { verifyToken } from "../actions";
import { getUserData } from "@/lib/getUserData";
import { getUserBusinesses } from "@/lib/getUserBusinesses";

async function Navbar() {
  const isAuthenticated = await verifyToken();
  if (isAuthenticated) {
    const { pk } = await getUserData();
    var businesses = await getUserBusinesses(pk);
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

      {isAuthenticated ? (
        businesses.length ? (
          <Link
            href={`/dashboard/${businesses[0].slug}/${businesses[0].branches[0].slug}/insights`}
          >
            داشبورد
          </Link>
        ) : (
          ""
        )
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
