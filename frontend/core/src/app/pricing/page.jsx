"use client";
import React, { useEffect, useState, useReducer } from "react";
import GoBackBtn from "../components/GoBackBtn";
import IconSelectorList from "../components/iconSelectorLIst";

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

  // useEffect(() => {
  //   console.log(items);
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([...items, item]);
    alert("submited");
  };

  return (
    <>
      <GoBackBtn></GoBackBtn>
      {/* form */}
      <br />
      <br />
      <br />

      <form
        onSubmit={handleSubmit}
        className="flex justify-between bg-red-600 p-4"
      >
        <input
          type="text"
          name="section-name"
          value={item.name}
          onChange={(e) => {
            dispatch({
              type: ACTIONS.ADD_NAME,
              payload: e.target.value,
            });
          }}
          placeholder="بنویس اینجا"
        />
        <button type="button" className="bg-blue-400 p-2">
          آیکون
        </button>
        <IconSelectorList
          action={(selectedIcon) => {
            dispatch({
              type: ACTIONS.ADD_ICON,
              payload: selectedIcon.pk,
            });
          }}
        ></IconSelectorList>
        <button type="submit" className="bg-blue-400 p-2">
          ثبت
        </button>
      </form>
      {item.name}
      {item.icon}
      {/* items list  */}
      <section></section>
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
