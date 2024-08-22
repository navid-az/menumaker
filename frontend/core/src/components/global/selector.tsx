"use client";

import React, { useState, useEffect, useRef } from "react";

//components
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

//libraries
import { gsap } from "gsap";

//types
type SelectorType = {
  action: (selectedItem: SelectorItemType) => void;
  defaultTab?: "icons" | "backgrounds";
};
export type SelectorItemType = { pk: number; name: string; image: string };
export type SelectorItemGroupType = {
  pk: number;
  name: string;
  icons: SelectorItemType[];
};
type ItemTabType = {
  onClick: () => void;
  children: React.ReactNode;
};

export default function Selector({
  action,
  defaultTab = "icons",
}: SelectorType) {
  const [selectedItem, setSelectedItem] = useState<
    SelectorItemType | undefined
  >();
  const [items, setItems] = useState<SelectorItemGroupType[]>([]);

  const fetchIconsData = () => {
    fetch("http://127.0.0.1:8000/pickers/icon-pickers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
      });
  };

  useEffect(() => {
    fetchIconsData();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      action(selectedItem);
    }
  }, [selectedItem]);

  return (
    <Tabs
      defaultValue={defaultTab}
      className="flex h-full w-full flex-col gap-2 p-3"
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
        <Tab
          data={items}
          description={"آیکون مورد نظر خود را از بین گروه های زیر انتخاب کنید"}
          title={"لیست آیکون ها"}
          setSelectedItem={setSelectedItem}
        ></Tab>
      </TabsContent>
      <TabsContent value="backgrounds">
        <Tab
          data={items}
          description={
            "پس زمنیه مورد نظر خود را از بین گروه های زیر انتخاب کنید"
          }
          title={"لیست پس زمینه ها"}
          setSelectedItem={setSelectedItem}
        ></Tab>
      </TabsContent>
    </Tabs>
  );
}

type TabType = {
  data: SelectorItemGroupType[];
  title: string;
  description: string;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<SelectorItemType | undefined>
  >;
};

function Tab({ data, title, description, setSelectedItem }: TabType) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupIsOpen, setGroupIsOpen] = useState(false);

  const goBackBtnRef = useRef(null);

  useEffect(() => {
    const goBackBtn = goBackBtnRef.current;
    //animate go back button
    if (groupIsOpen) {
      gsap.to(goBackBtn, { x: 0, opacity: 1, duration: 0.2 });
    } else {
      gsap.to(goBackBtn, { x: -8, opacity: 0, duration: 0.2 });
    }
  }, [groupIsOpen]);

  const handleClick = (groupIndex: number) => {
    setGroupIndex(groupIndex);
    setGroupIsOpen(true);
  };

  // checks the input of the clicked iconTile
  const selectItem = (item: SelectorItemType) => {
    setGroupIsOpen(false);
    setSelectedItem(item);
  };

  return (
    <div className="flex h-full w-full select-none flex-col gap-3 rounded-lg transition-all ease-in-out">
      <header className="flex flex-col items-end gap-2">
        <div className="flex w-full justify-between">
          {/* go back btn  */}
          <button
            type="button"
            ref={goBackBtnRef}
            id="go-back-btn"
            className="opacity-0"
            onClick={() => setGroupIsOpen((prev) => !prev)}
          >
            <Image
              width={24}
              height={24}
              alt="arrow left"
              src={"images/arrow-left.svg"}
            ></Image>
          </button>
          <h2 className="text-xl font-bold text-sky-blue">{title}</h2>
        </div>
        <p className="text-right text-sm font-light text-sad-blue">
          {description}
        </p>
      </header>
      <section className=" max-h-64 overflow-y-auto">
        <section
          id="groups-tab"
          className="scrollbar-thin scrollbar-track-[#0C2123] scrollbar-thumb-sky-blue scrollbar-thumb-rounded-lg grid w-full grid-cols-3 gap-2 rounded-lg pr-2 transition-all ease-in-out"
        >
          {/* show groups/items  */}
          {groupIsOpen
            ? data[groupIndex].icons.map((icon) => (
                <ItemTab key={icon.pk} onClick={() => selectItem(icon)}>
                  <div className="relative h-12 w-12 rounded-md">
                    <Image
                      className="rounded-md"
                      fill
                      alt={icon.name}
                      src={`http://127.0.0.1:8000/${icon.image}`}
                    ></Image>
                  </div>
                </ItemTab>
              ))
            : data.map((itemGroup, itemGroupIndex) => (
                <ItemTab
                  key={itemGroup.pk}
                  onClick={() => handleClick(itemGroupIndex)}
                >
                  <GroupImage itemGroup={itemGroup}></GroupImage>
                </ItemTab>
              ))}
        </section>
      </section>
    </div>
  );
}

function ItemTab({ onClick, children }: ItemTabType) {
  return (
    <div
      onClick={onClick}
      className="flex h-20 cursor-pointer items-center justify-center rounded-lg bg-sad-blue transition-transform duration-300 ease-in-out hover:scale-95"
    >
      {children}
    </div>
  );
}

//item's group image
function GroupImage({ itemGroup }: { itemGroup: SelectorItemGroupType }) {
  const icons = itemGroup.icons.slice(0, 3);

  return (
    <div className="group relative flex h-full w-full items-center justify-center">
      {icons[1] && (
        <div className="absolute left-0.5 h-10 w-10 scale-75 transform rounded-md opacity-70 transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:-rotate-6 group-hover:scale-90">
          <Image
            className="rounded-md"
            fill
            alt={icons[1].name}
            src={`http://127.0.0.1:8000/${icons[1].image}`}
          />
        </div>
      )}
      {icons[0] && (
        <div className="absolute z-10 h-12 w-12 rounded-md transition-all duration-300 group-hover:scale-95">
          <Image
            className="rounded-md"
            fill
            alt={icons[0].name}
            src={`http://127.0.0.1:8000/${icons[0].image}`}
          />
        </div>
      )}
      {icons[2] && (
        <div className="absolute right-0.5 h-10 w-10 scale-75 transform rounded-md opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:rotate-6 group-hover:scale-90">
          <Image
            className="rounded-md"
            fill
            alt={icons[2].name}
            src={`http://127.0.0.1:8000/${icons[2].image}`}
          />
        </div>
      )}
    </div>
  );
}
