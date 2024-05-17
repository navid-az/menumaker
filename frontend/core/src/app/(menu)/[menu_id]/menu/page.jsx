"use client";

import React, { createContext, useRef, useState } from "react";
import Link from "next/link";

//components
import MenuItemsWrapper from "./components/MenuItem";
import ItemsCategory from "./components/ItemsCategory";
import SearchBar from "./components/SearchBar";
import { Button } from "@/components/ui/button";
import { SkeletonTheme } from "react-loading-skeleton";

//SVGs
import { Bell } from "@/app/components/svgs";

export const colors = createContext(null);

export default function MenuPage({ params }) {
  let type = "fsdaf";

  const menuColors = { primary: "royal-green", secondary: "sky-blue" };
  const [searchedValue, setSearchedValue] = useState("");

  return (
    <SkeletonTheme baseColor="#a3bfc3" highlightColor="#dee3e3">
      <colors.Provider value={menuColors}>
        <div className={`flex ${type == "vertical" ? "flex-row" : "flex-col"}`}>
          <header className="flex w-full flex-col gap-2 bg-royal-green p-2 pb-0 sm:px-4">
            <section className="flex gap-1">
              <Button
                size="sm"
                className=" rounded-full bg-teal-200 text-royal-green"
                asChild
              >
                <Link href={`/${params.menu_id}/orders`}>سفارشات</Link>
              </Button>
              <Button
                size="sm"
                className=" rounded-full bg-teal-200 text-royal-green"
                asChild
              >
                <Link href="/">صفحه اصلی</Link>
              </Button>
            </section>
            <section className="flex w-full flex-wrap gap-2">
              <Button
                size="sm"
                className=" rounded-full bg-red-300 text-red-950"
              >
                گارسون
                <Bell className="ml-2 h-4 w-4" />
              </Button>
              <SearchBar
                value={searchedValue}
                setValue={setSearchedValue}
              ></SearchBar>
            </section>
          </header>
          <ItemsCategory type={type} params={params} />
          <MenuItemsWrapper
            type={type}
            searchedValue={searchedValue}
            params={params}
          />
        </div>
      </colors.Provider>
    </SkeletonTheme>
  );
}
