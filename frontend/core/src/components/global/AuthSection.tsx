"use client";

import React, { useState, useEffect } from "react";

//functions
import { cn } from "@/lib/utils";

//types
import { type User } from "@/app/types/api/auth";
import { type Business } from "@/app/types/api/business";

//SVGs
import { User2 } from "lucide-react";

//components
import Link from "next/link";
import { Button } from "../ui/button";
import { UserProfile } from "./UserProfile";

export default function AuthSection() {
  const [user, setUser] = useState<User | null>();
  const [businesses, setBusinesses] = useState<Business[] | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        isAuthenticated ? "w-10" : "w-[111px]"
      )}
    >
      {user && businesses ? (
        <UserProfile user={user} businesses={businesses}>
          <Button disabled={isLoading} size="icon" className=" bg-royal-green">
            <User2 className="h-6 w-6 text-soft-blue"></User2>
          </Button>
        </UserProfile>
      ) : (
        <Button
          disabled={isLoading}
          className=" bg-royal-green text-soft-blue hover:scale-105 transition-all duration-300 scale-pro"
        >
          <Link href="/register">ورود | ثبت نام</Link>
        </Button>
      )}
    </div>
  );
}
