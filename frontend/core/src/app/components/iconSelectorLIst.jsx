"use client";
import Image from "next/image";
import { useState } from "react";
import { gsap } from "gsap";

let iconList = [
  {
    groupName: "colored",
    icons: [
      { iconName: "salad", id: 1 },
      { iconName: "burger", id: 2 },
      { iconName: "burrito", id: 3 },
      { iconName: "pasta", id: 4 },
    ],
  },
  {
    groupName: "colored-outline",
    icons: [
      { iconName: "tea", id: 5 },
      { iconName: "coffee", id: 6 },
      { iconName: "drink", id: 7 },
      { iconName: "salad", id: 8 },
      { iconName: "chicken", id: 9 },
      { iconName: "stake", id: 10 },
      { iconName: "hot-dog", id: 11 },
      { iconName: "pizza-slice", id: 12 },
      { iconName: "burger", id: 13 },
    ],
  },
];

export default function IconSelectorList({ name }) {
  const [selectedIcon, setSelectedIcon] = useState("");
  const [groupIndex, setGroupIndex] = useState("");

  const tilesStyle =
    "h-20 flex cursor-pointer items-center justify-center rounded-lg bg-sad-blue transition-all ease-in-out hover:scale-95";

  const handleClick = (groupIndex, goBack = false) => {
    let groupsTab = document.getElementById("groups-tab");
    let iconsTab = document.getElementById(`icons-tab-${groupIndex}`);
    let goBackBtn = document.getElementById("go-back-btn");

    iconsTab.style.display = "grid";
    groupsTab.style.display = "none";
    setGroupIndex(groupIndex);
    gsap.set(goBackBtn, { x: 8, opacity: 0 });
    gsap.to(goBackBtn, { x: 0, opacity: 1, duration: 0.2 });

    // goes back to the groupTab
    if (goBack == true) {
      iconsTab.style.display = "none";
      groupsTab.style.display = "grid";
      gsap.set(goBackBtn, { x: 0, opacity: 1 });
      gsap.to(goBackBtn, { x: -8, opacity: 0, duration: 0.2 });
    }
  };

  // checks the input of the clicked iconTile
  const checkInput = (iconId) => {
    // let input = document.querySelector(`input[value=${groupName}-${icon}]`);
    // input.checked = true;
    setSelectedIcon(iconId);
    alert("selected");
  };

  const groups = iconList.map((group, index) => (
    <div onClick={() => handleClick(index)} className={tilesStyle}>
      {group.groupName}
    </div>
  ));

  const icons = iconList.map((group, index) => (
    <div
      id={`icons-tab-${index}`}
      className="hidden h-full w-full grid-cols-3 gap-2 rounded-lg pr-2 transition-all ease-in-out scrollbar-thin scrollbar-track-[#0C2123] scrollbar-thumb-sky-blue scrollbar-thumb-rounded-lg"
    >
      {group.icons.map((icon) => (
        <div className={tilesStyle} onClick={() => checkInput(icon.id)}>
          <Image
            width={55}
            height={55}
            src={`images/icon-selector/${group.groupName}/${icon.iconName}.svg`}
          ></Image>
          {/* <input
            className="hidden"
            type="radio"
            name={name}
            value={`${group.groupName}-${icon}`}
          /> */}
        </div>
      ))}
    </div>
  ));

  return (
    <div
      id="icon-selector-list"
      className="m-2 flex max-h-96 w-80 select-none flex-col gap-4 rounded-lg bg-royale-green p-3 transition-all ease-in-out"
    >
      <header className="flex flex-col items-end gap-2">
        <div className="flex w-full justify-between">
          <button
            id="go-back-btn"
            className="opacity-0"
            onClick={() => handleClick(groupIndex, true)}
          >
            <Image width={24} height={24} src={"images/arrow-left.svg"}></Image>
          </button>
          <h2 className="text-xl font-bold text-sky-blue">لیست آیکون ها</h2>
        </div>
        <p className="text-right text-sm font-light text-sad-blue">
          آیکون مورد نظر خود را از بین گروه های زیر انتخاب کنید
        </p>
      </header>
      <section className=" max-h-64 overflow-y-auto">
        <section
          id="groups-tab"
          className="grid w-full grid-cols-3 gap-2 rounded-lg pr-2 transition-all ease-in-out scrollbar-thin scrollbar-track-[#0C2123] scrollbar-thumb-sky-blue scrollbar-thumb-rounded-lg"
        >
          {groups}
        </section>
        {icons}
      </section>
    </div>
  );
}
