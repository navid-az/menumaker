"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

type SelectorType = { action: () => void; defaultTab: "icons" | "backgrounds" };

export default function Selector({
  action,
  defaultTab = "backgrounds",
}: SelectorType) {
  const [selectedIcon, setSelectedIcon] = useState({});
  const [groupIndex, setGroupIndex] = useState("");
  const [iconsList, setIcons] = useState([]);

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
  const checkInput = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <Tabs
      defaultValue={defaultTab}
      className="flex h-full w-full flex-col gap-3 p-3"
    >
      <TabsList className="flex h-max w-full gap-3 p-1.5">
        <TabsTrigger className=" h-10 flex-1" value="icons">
          آیکون
        </TabsTrigger>
        <TabsTrigger className=" h-10 flex-1" value="backgrounds">
          پس زمینه ها
        </TabsTrigger>
      </TabsList>
      <TabsContent value="icons">
        <div className="flex h-full w-full select-none flex-col gap-3 rounded-lg bg-royal-green transition-all ease-in-out">
          <header className="flex flex-col items-end gap-2">
            <div className="flex w-full justify-between">
              <button
                type="button"
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
              className="scrollbar-thin scrollbar-track-[#0C2123] scrollbar-thumb-sky-blue scrollbar-thumb-rounded-lg grid w-full grid-cols-3 gap-2 rounded-lg pr-2 transition-all ease-in-out"
            >
              {iconsList.map((group, index) => (
                <div
                  key={group.pk}
                  onClick={() => handleClick(index)}
                  className={tilesStyle}
                >
                  {group.name}
                </div>
              ))}
            </section>
            {iconsList.map((group, index) => (
              <div
                key={group.pk}
                id={`icons-tab-${index}`}
                className="scrollbar-thin scrollbar-track-[#0C2123] scrollbar-thumb-sky-blue scrollbar-thumb-rounded-lg hidden h-full w-full grid-cols-3 gap-2 rounded-lg pr-2 transition-all ease-in-out"
              >
                {group.icons.map((icon) => (
                  <div
                    key={icon.pk}
                    className={tilesStyle}
                    onClick={() => checkInput(icon)}
                  >
                    <p>{icon.name}</p>
                  </div>
                ))}
              </div>
            ))}
          </section>
        </div>
      </TabsContent>
      <TabsContent value="backgrounds">
        <div className="flex h-full w-full select-none flex-col gap-3 rounded-lg bg-royal-green transition-all ease-in-out">
          <header className="flex flex-col items-end gap-2">
            <div className="flex w-full justify-between">
              <button
                type="button"
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
              <h2 className="text-xl font-bold text-sky-blue">
                لیست پس زمینه ها
              </h2>
            </div>
            <p className="text-right text-sm font-light text-sad-blue">
              پس زمینه مورد نظر خود را از بین گروه های زیر انتخاب کنید
            </p>
          </header>
          <section className=" max-h-64 overflow-y-auto">
            <section
              id="groups-tab"
              className="scrollbar-thin scrollbar-track-[#0C2123] scrollbar-thumb-sky-blue scrollbar-thumb-rounded-lg grid w-full grid-cols-3 gap-2 rounded-lg pr-2 transition-all ease-in-out"
            >
              {iconsList.map((group, index) => (
                <div
                  key={group.pk}
                  onClick={() => handleClick(index)}
                  className={tilesStyle}
                >
                  {group.name}
                </div>
              ))}
            </section>
            {iconsList.map((group, index) => (
              <div
                key={group.pk}
                id={`icons-tab-${index}`}
                className="scrollbar-thin scrollbar-track-[#0C2123] scrollbar-thumb-sky-blue scrollbar-thumb-rounded-lg hidden h-full w-full grid-cols-3 gap-2 rounded-lg pr-2 transition-all ease-in-out"
              >
                {group.icons.map((icon) => (
                  <div
                    key={icon.pk}
                    className={tilesStyle}
                    onClick={() => checkInput(icon)}
                  >
                    <p>{icon.name}</p>
                  </div>
                ))}
              </div>
            ))}
          </section>
        </div>
      </TabsContent>
    </Tabs>
  );
}
