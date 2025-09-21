"use client";

import React, { useState, useEffect } from "react";

//components
import { Button } from "@/components/ui/button";

//SVGs
import {
  ShoppingBag,
  AlignLeft,
  Search,
  Filter,
  Loader2,
  ConciergeBell,
} from "lucide-react";
import { useSearchBar } from "@/lib/stores";
import { Input } from "@/components/ui/input";

//types
import { type Menu } from "../page";

export default function MenuHeader({ menuData }: { menuData: Menu }) {
  const { setSearchQuery, searchQuery } = useSearchBar();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [searchQuery]);

  async function callWaiter() {
    const sessionCode = sessionStorage.getItem("session_code");
    const res = await fetch(
      `http://127.0.0.1:8000/business/table-sessions/${sessionCode}/call-waiter/create/`,
      { method: "POST" }
    );
    if (!res.ok) {
      console.error("wtf just happened");
    }
  }

  return (
    <section className="flex w-full flex-col gap-4 rounded px-4 pt-4">
      <section className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={() => callWaiter()}
            size="icon"
            className="rounded-(--radius-base) bg-(--secondary) text-(--primary)"
          >
            <ConciergeBell></ConciergeBell>
          </Button>
          <Button className="flex w-max items-center justify-between gap-2 rounded-(--radius-base) bg-(--secondary) px-4 text-(--primary)">
            <ShoppingBag className="h-5 w-5"></ShoppingBag>
            <p className="mt-1 text-lg">2</p>
          </Button>
        </div>
        <AlignLeft className="ml-2 text-(--primary)"></AlignLeft>
      </section>
      <div className="flex gap-2">
        {menuData.searchbar_enabled && (
          <div className="relative flex-1">
            <Input
              className="rounded-[var(--radius-base) peer rounded-(--radius-base) border-none bg-(--secondary) ps-9 text-(--primary) ring-(--primary)! placeholder:text-(--primary) placeholder:opacity-60"
              placeholder="جستجو"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              {isLoading ? (
                <Loader2 className="ml-1.5 h-5 w-5 animate-spin text-(--primary) opacity-80"></Loader2>
              ) : (
                <Search className="ml-1.5 h-5 w-5 text-(--primary) opacity-80" />
              )}
            </div>
          </div>
        )}
        <Button
          size="icon"
          className="flex-none rounded-(--radius-base) bg-(--secondary) text-(--primary)"
        >
          <Filter className="h-5 w-5"></Filter>
        </Button>
      </div>
    </section>
  );
}
