"use client";

import React, { createContext } from "react";
import GoBackBtn from "@/app/components/GoBackBtn";
import MenuItemsWrapper from "./components/MenuItem";
import ItemsCategory from "./components/ItemsCategory";

import { SkeletonTheme } from "react-loading-skeleton";
import Link from "next/link";

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
          <header className="bg-royal-green">
            <GoBackBtn
              link={`/${params.orgName}/orders`}
              absolute={false}
              text="سفارشات"
              secondary_color="royal-green"
              primary_color="sky-blue"
            ></GoBackBtn>
          </header>
          <header className="bg-royal-green">
            <GoBackBtn
              absolute={false}
              text="صفحه اصلی"
              secondary_color="royal-green"
              primary_color="sky-blue"
            ></GoBackBtn>
          </header>
          <ItemsCategory type={type} params={params} />
          <MenuItemsWrapper params={params} type={type} />
        </div>
      </colors.Provider>
    </SkeletonTheme>
  );
}
