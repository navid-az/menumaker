"use client";

import React, { useState, useEffect } from "react";

//functions
import { cn } from "@/lib/utils";

//types
import { type User } from "@/app/types/api/auth";
import { type BusinessType } from "@/app/dashboard/layout";

//components
import Link from "next/link";
import { Button } from "../ui/button";
import { UserProfile } from "./UserProfile";

export default function AuthSection() {
  const [user, setUser] = useState<User | null>();
  const [businesses, setBusinesses] = useState<BusinessType[] | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth", { method: "GET" });
        if (!res.ok) throw new Error();
        const data: { user: User; businesses: BusinessType[] } =
          await res.json();
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
        isLoading ? "backdrop-blur-xl" : "backdrop-blur-none"
      )}
    >
      <div
        className={cn(
          "relative justify-end flex gap-2 w-auto transition-all duration-300"
        )}
      >
        {user && businesses ? (
          <UserProfile user={user} businesses={businesses}></UserProfile>
        ) : (
          <Button className="text-lg" asChild>
            <Link href="/register">ورود | ثبت نام</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
