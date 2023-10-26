"use client";

import React, { useState, createContext } from "react";
import GoBackBtn from "@/app/components/GoBackBtn";
import MenuItem from "./components/MenuItem";
import ItemsCategory from "./components/ItemsCategory";

// react query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const colors = createContext(null);

export default function MenuPage({ params }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/single/${params.orgName}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // const [scrolled, setScrolled] = useState(0);

  let type = "vertical";

  const menuColors = { primary: "royale-green", secondary: "sky-blue" };
  return (
    <div className="relative">
      <div>this is {params.orgName} menu page!</div>
      <colors.Provider value={menuColors}>
        <GoBackBtn absolute={false}></GoBackBtn>
        <ItemsCategory params={params}></ItemsCategory>
        <div
          className={`w-full gap-2 px-2 pt-12 sm:gap-4 sm:px-4 ${
            type == "vertical" ? "grid sm:grid-cols-2" : "flex flex-col"
          }`}
        >
          {data["categories"].map((category) =>
            category["items"].map((item) => (
              <MenuItem
                price={item.price}
                body={item.description}
                title={item.name}
                type={type}
              ></MenuItem>
            ))
          )}
        </div>
      </colors.Provider>
    </div>
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
