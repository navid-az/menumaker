"use client";
import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  createContext,
  useRef,
} from "react";
import GoBackBtn from "../components/GoBackBtn";
import MenuItem from "../menu/components/MenuItem";
import ItemsCategory from "../menu/components/ItemsCategory";

export const colors = createContext(null);

export default function Pricing() {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {}, []);
  let type = "vertical";

  const menuColors = { primary: "royale-green", secondary: "sky-blue" };
  return (
    <div className="relative">
      <colors.Provider value={menuColors}>
        <GoBackBtn absolute={false}></GoBackBtn>
        <ItemsCategory></ItemsCategory>
        <div
          className={`w-full gap-2 px-2 pt-12 sm:gap-4 sm:px-4 ${
            type == "vertical" ? "grid sm:grid-cols-2" : "flex flex-col"
          }`}
        >
          <MenuItem
            price="۱۸۳۰۰۰"
            body="پپرونی،ففل دلمه،سس سالسا،چیلی،قارچ"
            title="پیتزای پپرونی"
            type={type}
          ></MenuItem>
          <MenuItem></MenuItem>
          <MenuItem></MenuItem>
          <MenuItem></MenuItem>
        </div>
      </colors.Provider>
      {scrolled}
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
