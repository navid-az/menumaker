"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import handleSubmit from "@/app/lib/handleSubmit";

export default function IconSelectorList({ name, action }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [groupIndex, setGroupIndex] = useState("");
  const [Icons, setIcons] = useState([]);

  const fetchIconsData = () => {
    fetch("http://127.0.0.1:8000/pickers/icon-pickers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIcons(data);
      });
  };

  useEffect(() => {
    fetchIconsData();
  }, []);

  useEffect(() => {
    action(selectedIcon);
  }, [selectedIcon]);

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
  };

  return (
    <div
      id="icon-selector-list"
      className=" m-2 flex max-h-max w-80 select-none flex-col gap-4 rounded-lg bg-royale-green p-3 transition-all ease-in-out"
    >
      <header className="flex flex-col items-end gap-2">
        <div className="flex w-full justify-between">
          <button
            id="go-back-btn"
            className="opacity-0"
            onClick={() => handleClick(groupIndex, true)}
          >
            <Image
              width={24}
              height={24}
              alt="arrow left"
              src={"images/arrow-left.svg"}
            ></Image>
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
          {/* {groups} */}
          {Icons.map((group, index) => (
            <div
              key={group.pk}
              onClick={() => handleClick(index)}
              className={tilesStyle}
            >
              {group.name}
            </div>
          ))}
        </section>
        {/* {icons} */}
        {Icons.map((group, index) => (
          <div
            key={group.pk}
            id={`icons-tab-${index}`}
            className="hidden h-full w-full grid-cols-3 gap-2 rounded-lg pr-2 transition-all ease-in-out scrollbar-thin scrollbar-track-[#0C2123] scrollbar-thumb-sky-blue scrollbar-thumb-rounded-lg"
          >
            {group.icons.map((icon) => (
              <div
                key={icon.pk}
                className={tilesStyle}
                onClick={() => checkInput(icon.id)}
              >
                <Image
                  width={55}
                  height={55}
                  alt={icon.name}
                  src={icon.image}
                ></Image>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
