"use client";
import React, { useEffect, useState, useReducer } from "react";
import GoBackBtn from "../components/GoBackBtn";
import IconSelectorList from "../components/iconSelectorLIst";

import MenuItem from "../menu/components/MenuItem";

const ACTIONS = {
  ADD_ITEM: "addItem",
  ADD_ICON: "addIcon",
  ADD_NAME: "add_name",
};

const reducer = (item, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ICON:
      return { ...item, icon: action.payload };
    case ACTIONS.ADD_NAME:
      return { ...item, name: action.payload };
    default:
      item;
  }
};

export default function Pricing() {
  const [items, setItems] = useState([]);
  const [item, dispatch] = useReducer(reducer, { icon: "", name: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([...items, item]);
    alert("submited");
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-2 sm:gap-4 sm:p-4">
        <GoBackBtn></GoBackBtn>
        <br />
        <br />
        <MenuItem
          price="۱۸۳۰۰۰"
          body="پپرونی،ففل دلمه،سس سالسا،چیلی،قارچ"
          title="پیتزای پپرونی"
        ></MenuItem>
        <MenuItem></MenuItem>
        <MenuItem></MenuItem>
        <MenuItem></MenuItem>
      </div>
    </>
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
