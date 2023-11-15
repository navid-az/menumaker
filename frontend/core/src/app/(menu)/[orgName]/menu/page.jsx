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

  const menuColors = { primary: "royale-green", secondary: "sky-blue" };
  return (
    <SkeletonTheme baseColor="#a3bfc3" highlightColor="#dee3e3">
      <colors.Provider value={menuColors}>
        <div
          className={`relative flex bg-soft-blue ${
            type == "vertical" ? "flex-row" : "flex-col"
          }`}
        >
          {/* <GoBackBtn absolute={false}></GoBackBtn> */}
          <Link href={`/${params.orgName}/orders`}>Orders</Link>
          <ItemsCategory type={type} params={params} />
          <MenuItemsWrapper params={params} type={type} />
        </div>
      </colors.Provider>
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
