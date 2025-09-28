"use client";

import React, { useRef, useState, useEffect } from "react";

//components
import { Button } from "@/components/ui/button";

//SVGs
import { Loader2, X, Search } from "lucide-react";

//hooks
import { useSearchBar } from "@/lib/stores";

//types
type SearchBar = {
  value: string;
  onChange: () => void;
};

export default function SearchBar() {
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
    <div className="flex h-max flex-1 items-center justify-between rounded-(--radius-base) bg-(--secondary) p-1">
      <Button
        ref={searchBtnRef}
        size="icon"
        className="h-8 aspect-square rounded-full bg-(--primary) text-(--secondary)"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin"></Loader2>
        ) : (
          <Search className="h-4 w-4 text-(--secondary)" />
        )}
      </Button>
      <section className="flex h-full flex-1 items-center justify-between">
        <input
          ref={inputRef}
          className="h-full flex-1 rounded-full bg-inherit px-2 text-right text-xs font-normal text-(--primary) caret-(--primary) outline-none placeholder:text-(--primary)/80"
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
            <X className="h-4 w-4 text-(--primary)"></X>
          </Button>
        )}
      </section>
    </div>
  );
}
