"use client";

import React, { useState, useEffect } from "react";

//components
import { Button } from "@/components/ui/button";

//SVGs
import { ShoppingBag, AlignLeft, Search, Filter, Loader2 } from "lucide-react";
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

  return (
    <section className="flex w-full flex-col gap-4 rounded px-4 pt-4">
      <section className="flex items-center justify-between">
        <Button className="flex w-max items-center justify-between gap-2 rounded-[var(--radius-base)] bg-[color:var(--secondary)] px-4 text-[color:var(--primary)]">
          <ShoppingBag className="h-5 w-5"></ShoppingBag>
          <p className="mt-1 text-lg">2</p>
        </Button>
        <AlignLeft className="ml-2 text-[color:var(--primary)]"></AlignLeft>
      </section>
      <div className="flex gap-2">
        {menuData.searchbar_enabled && (
          <div className="relative flex-1">
            <Input
              className="rounded-[var(--radius-base) peer rounded-[var(--radius-base)] border-none bg-[color:var(--secondary)] ps-9 text-[color:var(--primary)] !ring-[color:var(--primary)] placeholder:text-[color:var(--primary)] placeholder:opacity-60"
              placeholder="جستجو"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              {isLoading ? (
                <Loader2 className="ml-1.5 h-5 w-5 animate-spin text-[color:var(--primary)] opacity-80"></Loader2>
              ) : (
                <Search className="ml-1.5 h-5 w-5 text-[color:var(--primary)] opacity-80" />
              )}
            </div>
          </div>
        )}
        <Button
          size="icon"
          className="flex-none rounded-[var(--radius-base)] bg-[color:var(--secondary)] text-[color:var(--primary)]"
        >
          <Filter className="h-5 w-5"></Filter>
        </Button>
      </div>
    </section>
  );
}
