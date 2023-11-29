"use client";

import React, { createContext } from "react";
import GoBackBtn from "@/app/components/GoBackBtn";
import MenuItemsWrapper from "./components/MenuItem";
import ItemsCategory from "./components/ItemsCategory";

import { SkeletonTheme } from "react-loading-skeleton";
import Link from "next/link";
import { ArrowLeft } from "@/app/components/svgs";

export const colors = createContext(null);

export default function MenuPage({ params }) {
  let type = "fsdaf";

  const menuColors = { primary: "royal-green", secondary: "sky-blue" };
  return (
    <SkeletonTheme baseColor="#a3bfc3" highlightColor="#dee3e3">
      <colors.Provider value={menuColors}>
        <div
          className={`relative flex bg-soft-blue ${
            type == "vertical" ? "flex-row" : "flex-col"
          }`}
        >
          <header className="flex gap-1 bg-royal-green p-2">
            <GoBackBtn
              link={`/${params.orgName}/orders`}
              absolute={false}
              text="سفارشات"
              secondary_color="royal-green"
              primary_color="sky-blue"
            >
              {/* <ArrowLeft className={`stroke-red-600 text-xl`} /> */}
              <p className=" font-semibold">سفارشات</p>
            </GoBackBtn>
            <GoBackBtn
              absolute={false}
              text="صفحه اصلی"
              secondary_color="royal-green"
              primary_color="sky-blue"
            >
              <p className=" font-semibold">صفحه اصلی</p>
            </GoBackBtn>
          </header>
          <ItemsCategory type={type} params={params} />
          <MenuItemsWrapper type={type} params={params} />
        </div>
      </colors.Provider>
    </SkeletonTheme>
  );
}
