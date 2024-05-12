"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import closeTabOnOutsideClick from "@/lib/closeTabOnOutsideClick";

//types
import type { PlacesType } from "../layout";
import { Building } from "./svg";

type MyPlacesTabType = {
  name: string;
  position: string;
  places: PlacesType;
  //   venueType: "restaurant" | "cafe" | "buffet" | "food truck";
};

export default function MyPlacesTab({
  name,
  position,
  places,
}: MyPlacesTabType) {
  const [IsOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("venhan");
  const tab = useRef(null);

  const outsideClick = closeTabOnOutsideClick(tab);
  const handleTab = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (outsideClick) {
      setIsOpen(false);
    }
  }, [outsideClick]);

  const handleClick = (menu_id: string) => {
    setIsOpen((prev) => !prev);
    setCurrentMenu(menu_id);
  };

  return (
    <div
      ref={tab}
      className={`flex ${
        IsOpen ? " h-[280px] border-sky-blue/80" : "h-[86px]"
      } w-full select-none flex-col gap-2 rounded-xl rounded-tl-3xl border-4 border-sad-blue bg-soft-blue  p-2 text-primary transition-all duration-300`}
    >
      <div
        onClick={handleTab}
        className="flex cursor-pointer items-center justify-between"
      >
        <section className="flex w-auto items-center gap-2">
          <Building className="h-6 w-6"></Building>
          <p className=" text-xl">مجموعه {name}</p>
        </section>
        <ArrowLeft
          className={` transition-all ${IsOpen ? "-rotate-90" : "rotate-0"}`}
        ></ArrowLeft>
      </div>
      <span className="flex items-center gap-2">
        <p>سمت شما</p>
        <p className=" w-max rounded-full bg-yellow-400 px-3 py-1 text-xs text-yellow-900">
          {position}
        </p>
      </span>
      <section
        className={`flex w-full flex-col gap-1 rounded-lg border border-primary/30 bg-sad-blue p-1 opacity-0 transition-all  ${
          IsOpen ? " opacity-100 delay-75" : "opacity-0 delay-0"
        }`}
      >
        {places.map((place) => (
          <Button
            onClick={handleClick}
            className="scale-pro justify-start gap-2 border border-sad-blue bg-sad-blue px-2 py-3 text-base font-normal text-primary transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-white"
          >
            <Building className="h-6 w-6"></Building>
            {place.name}
          </Button>
        ))}
      </section>
    </div>
  );
}
