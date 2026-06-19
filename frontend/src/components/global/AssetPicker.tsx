"use client";

import React, { useState, useEffect, useRef } from "react";

//components
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

//SVGs
import { ArrowLeft } from "lucide-react";

//libraries
import { gsap } from "gsap";

//types
export type AssetType = { id: number; name: string; image: string };
export type AssetGroupType = {
  id: number;
  name: string;
  description: string;
  assets: AssetType[];
};

type AssetPickerType = {
  assetGroups: AssetGroupType[];
  value?: AssetType | null; // Controlled value (selected asset)
  onChange?: (selectedItem: AssetType) => void; // Callback to update value
  defaultTab?: "icons" | "backgrounds";
};

type AssetSelectorType = {
  data: AssetGroupType[];
  title: string;
  description: string;
  value?: AssetType | null;
  onChange?: (selectedItem: AssetType) => void;
};

type AssetProps = {
  onClick: () => void;
  children: React.ReactNode;
  isSelected?: boolean;
};

export default function AssetPicker({
  assetGroups,
  value,
  onChange,
  defaultTab = "icons",
}: AssetPickerType) {
  return (
    <Tabs
      defaultValue={defaultTab}
      className="flex h-full w-full flex-col gap-3"
    >
      <TabsList
        dir="rtl"
        className="flex h-max w-full gap-2 rounded-md border-2 border-primary bg-soft-blue p-1.5"
      >
        <TabsTrigger className="h-10 flex-1 rounded-md" value="icons">
          آیکون
        </TabsTrigger>
        <TabsTrigger className="h-10 flex-1 rounded-md" value="backgrounds">
          پس زمینه ها
        </TabsTrigger>
      </TabsList>
      <TabsContent value="icons">
        <AssetTab
          data={assetGroups}
          title="لیست آیکون ها"
          description="آیکون مورد نظر خود را از بین گروه های زیر انتخاب کنید"
          value={value}
          onChange={onChange}
        />
      </TabsContent>
      <TabsContent value="backgrounds">
        <AssetTab
          data={assetGroups}
          title="لیست پس زمینه ها"
          description="پس زمینه مورد نظر خود را از بین گروه های زیر انتخاب کنید"
          value={value}
          onChange={onChange}
        />
      </TabsContent>
    </Tabs>
  );
}

function AssetTab({
  data,
  title,
  description,
  value,
  onChange,
}: AssetSelectorType) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupIsOpen, setGroupIsOpen] = useState(false);

  const goBackBtnRef = useRef(null);

  //go back button animation
  useEffect(() => {
    const goBackBtn = goBackBtnRef.current;
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

  const selectItem = (item: AssetType) => {
    setGroupIsOpen(false);
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <div className="flex h-full w-full select-none flex-col gap-3 rounded-lg transition-all ease-in-out">
      <header className="flex flex-col items-end gap-1">
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            ref={goBackBtnRef}
            id="go-back-btn"
            className="rounded-md bg-primary p-1 opacity-0"
            onClick={() => setGroupIsOpen(false)}
          >
            <ArrowLeft className="text-primary-foreground" />
          </button>
          <h2 className="text-xl font-bold text-primary">
            {groupIsOpen ? data[groupIndex].name : title}
          </h2>
        </div>
        <p className="text-right text-sm font-light text-primary">
          {groupIsOpen ? data[groupIndex].description : description}
        </p>
      </header>
      <section className="max-h-44 overflow-y-auto">
        <section
          id="groups-tab"
          className="scrollbar-thin scrollbar-track-[#0C2123] scrollbar-thumb-sky-blue scrollbar-thumb-rounded-lg grid w-full grid-cols-3 gap-3 rounded-lg transition-all ease-in-out"
        >
          {groupIsOpen
            ? data[groupIndex].assets.map((asset) => (
                <AssetTile
                  key={asset.id}
                  onClick={() => selectItem(asset)}
                  isSelected={asset.id === value?.id}
                >
                  <div className="relative h-12 w-12 rounded-md">
                    <Image
                      className="rounded-md"
                      fill
                      alt={asset.name}
                      src={`http://127.0.0.1:8000${asset.image}`}
                    />
                  </div>
                </AssetTile>
              ))
            : data.map((itemGroup, itemGroupIndex) => (
                <AssetTile
                  key={itemGroup.id}
                  onClick={() => handleClick(itemGroupIndex)}
                  isSelected={itemGroup.assets.some(
                    (asset) => asset.id === value?.id
                  )}
                >
                  <AssetGroupImage itemGroup={itemGroup} />
                </AssetTile>
              ))}
        </section>
      </section>
    </div>
  );
}

function AssetTile({ onClick, children, isSelected }: AssetProps) {
  return (
    <div
      onClick={onClick}
      className={`scale-pro flex h-20 cursor-pointer items-center justify-center rounded-lg border-2 ${
        isSelected ? "border-primary" : "border-transparent"
      } bg-sad-blue transition-all duration-300 ease-in-out hover:scale-95 hover:border-primary`}
    >
      {children}
    </div>
  );
}

function AssetGroupImage({ itemGroup }: { itemGroup: AssetGroupType }) {
  const instances = itemGroup.assets.slice(0, 3);
  return (
    <div className="group relative flex h-full w-full items-center justify-center">
      {instances[1] && (
        <div className="absolute left-0.5 h-10 w-10 scale-75 transform rounded-md opacity-70 transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:-rotate-6 group-hover:scale-90">
          <Image
            className="rounded-md"
            fill
            alt={instances[1].name}
            src={`http://127.0.0.1:8000${instances[1].image}`}
          />
        </div>
      )}
      {instances[0] && (
        <div className="absolute z-10 h-12 w-12 rounded-md transition-all duration-300 group-hover:scale-95">
          <Image
            className="rounded-md"
            fill
            alt={instances[0].name}
            src={`http://127.0.0.1:8000${instances[0].image}`}
          />
        </div>
      )}
      {instances[2] && (
        <div className="absolute right-0.5 h-10 w-10 scale-75 transform rounded-md opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:rotate-6 group-hover:scale-90">
          <Image
            className="rounded-md"
            fill
            alt={instances[2].name}
            src={`http://127.0.0.1:8000${instances[2].image}`}
          />
        </div>
      )}
    </div>
  );
}
