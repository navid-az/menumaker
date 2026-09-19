"use client";

import React, { useState, useEffect } from "react";

//functions
import { cn } from "@/lib/utils";

//types
import { type User } from "@/app/types/api/auth";
import { type Business } from "@/app/types/api/business";

//hooks
import { useSearchParams } from "next/navigation";

//SVGs
import { User2 } from "lucide-react";

//components
import Link from "next/link";
import { Button } from "../ui/button";
import { UserProfile } from "./UserProfile";

//libraries
import { useTranslations } from "next-intl";

export default function AuthSection({ locale }: { locale: string }) {
  const [user, setUser] = useState<User | null>();
  const [businesses, setBusinesses] = useState<Business[] | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";

  const t = useTranslations('userProfile')

  useEffect(() => {
    if (user && businesses) {
      setIsAuthenticated(true);
    }
  }, [user, businesses]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth", { method: "GET" });
        if (!res.ok) throw new Error();
        const data: { user: User; businesses: Business[] } = await res.json();
        setUser(data.user);
        setBusinesses(data.businesses);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <div
      className={cn(
        "transition-all duration-300",
        isLoading ? "blur-sm" : "blur-none",
        isAuthenticated
          ? "w-10"
          : locale === "fa"
            ? "w-[109px]"
            : "w-20"
      )}
    >
      {user && businesses ? (
        <UserProfile locale={locale} user={user} businesses={businesses}>
          <Button disabled={isLoading} size="icon" className="size-10 bg-inherit hover:bg-royal-green/8 transition-all duration-300">
            <User2 className="size-6 text-royal-green"></User2>
          </Button>
        </UserProfile>
      ) : (
        <Button
          asChild
          disabled={isLoading}
          className={cn("group text-sm lg:text-sm lg:font-medium font-normal text-white transition-all duration-300 hover:scale-110 scale-pro bg-royal-green", isLoading && 'bg-royal-green/60')}
        >
          <Link className="h-10 bg-red-600 w-full" href={"/register"}>
            <p className="transition-all duration-300 scale-pro group-hover:scale-90">
              {t('loginButton')}
            </p>
          </Link>
        </Button>
      )}
    </div>
  );
}
