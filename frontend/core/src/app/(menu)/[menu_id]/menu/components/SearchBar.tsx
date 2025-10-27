"use client";

import React, { useRef, useState, useEffect } from "react";

//components
import { Button } from "@/components/ui/button";

//SVGs
import { Loader2, X, Search } from "lucide-react";

//hooks
import { useSearchBar } from "@/lib/stores";

//libraries
import { cn } from "@/lib/utils";

//types
import { type MenuGlobalStylingUI } from "@/app/types/ui/menu";
type SearchBar = {
  globalStyling: MenuGlobalStylingUI;
  value: string;
  onChange: () => void;
};

export default function SearchBar({
  globalStyling,
}: {
  globalStyling: MenuGlobalStylingUI;
}) {
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  // useConditionalAnimation(searchBtnRef, ["tactile"]);

  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchQuery, searchQuery } = useSearchBar();

  //auto select value onClick
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

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
    <div
      className={cn(
        "flex h-max flex-1 items-center justify-between rounded-(--radius-base) bg-(--primary) p-1 duration-300 transition-all",
        globalStyling.style === "retro" &&
          "border-3 shadow-[4px_4px_0px_0px_var(--secondary)] border-(--secondary)"
      )}
    >
      <Button
        ref={searchBtnRef}
        size="icon"
        className="h-8 aspect-square rounded-(--radius-inner) bg-(--secondary) text-(--primary) transition-all duration-300"
      >
        {isLoading ? (
          <Loader2
            className={cn(
              "h-4 w-4 animate-spin",
              globalStyling.style === "retro" && "stroke-3"
            )}
          ></Loader2>
        ) : (
          <Search
            className={cn(
              "h-4 w-4 text-(--primary) transition-all duration-300",
              globalStyling.style === "retro" && "stroke-3"
            )}
          />
        )}
      </Button>
      <section className="flex h-full flex-1 items-center justify-between">
        <input
          ref={inputRef}
          className={cn(
            "h-full flex-1 rounded-full bg-inherit px-2 text-right text-xs font-normal text-(--secondary) caret-(--secondary) transition-all duration-300 outline-none placeholder:text-(--secondary)/80",
            globalStyling.style === "retro" &&
              "text-sm font-bold placeholder:text-(--secondary)/60"
          )}
          placeholder="جستجو آیتم"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={handleClick}
        />
        {searchQuery && (
          <Button
            onClick={() => {
              setSearchQuery("");
            }}
            size="icon"
            className="-mr-2 h-full bg-inherit text-inherit"
          >
            <X
              className={cn(
                "h-4 w-4 text-(--secondary)",
                globalStyling.style === "retro" && "stroke-3"
              )}
            ></X>
          </Button>
        )}
      </section>
    </div>
  );
}
