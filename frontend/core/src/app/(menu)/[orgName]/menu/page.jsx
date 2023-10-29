"use client";

import React, { useState, createContext } from "react";
import GoBackBtn from "@/app/components/GoBackBtn";
import MenuItemsWrapper from "./components/MenuItem";
import ItemsCategory from "./components/ItemsCategory";

import { SkeletonTheme } from "react-loading-skeleton";

export const colors = createContext(null);

export default function MenuPage({ params }) {
  let type = "vertical";

  const menuColors = { primary: "royale-green", secondary: "sky-blue" };
  return (
    <SkeletonTheme baseColor="#a3bfc3" highlightColor="#dee3e3">
      <div className="relative">
        <colors.Provider value={menuColors}>
          <GoBackBtn absolute={false}></GoBackBtn>
          <ItemsCategory params={params}></ItemsCategory>
          <div
            className={`w-full gap-2 px-2 pt-12 sm:gap-4 sm:px-4 ${
              type == "vertical" ? "grid sm:grid-cols-2" : "flex flex-col"
            }`}
          >
            <MenuItemsWrapper params={params}></MenuItemsWrapper>
          </div>
        </colors.Provider>
      </div>
    </SkeletonTheme>
  );
}

// <div className="apple bg-yellow-500">
//   <div>this is just a test</div>
//   <section className="banana gap-4 p-2">
//     <div className="w-full gap-2 bg-red-300 p-4 text-green-200">
//       <div className="bg-yellow-500">salamss</div>
//       <div className="bg-yellow-500">salamss</div>
//     </div>
//     <div className="w-full gap-2 bg-red-400 p-4 text-green-200">
//       <div className="bg-yellow-500">salam</div>
//       <div className="bg-yellow-500">salam</div>
//       <div className="bg-yellow-500">salam</div>
//     </div>
//   </section>
//   <section className="banana gap-4 p-2">
//     <div className=" w-full gap-2 bg-red-900 p-4 text-green-200">
//       <div className="bg-yellow-500">salamss</div>
//       <div className="bg-yellow-500">salamsss</div>
//       <div className="bg-yellow-500">salamss</div>
//       <div className="bg-yellow-500">salamss</div>
//       <div className="bg-yellow-500">salamss</div>
//     </div>
//     <div className="w-full gap-2 bg-red-800 p-4 text-green-200">
//       <div className="bg-yellow-500">salam</div>
//       <div className="bg-yellow-500">salam</div>
//       <div className="bg-yellow-500">salam</div>
//     </div>
//     <div className="w-full gap-2 bg-red-600 p-4 text-green-200">
//       <div className="bg-yellow-500">salam</div>
//       <div className="bg-yellow-500">salam</div>
//       <div className="bg-yellow-500">salam</div>
//     </div>
//   </section>
// </div>
