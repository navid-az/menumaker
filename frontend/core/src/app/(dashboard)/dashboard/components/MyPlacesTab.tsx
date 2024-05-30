"use client";

import React, { useState, useRef, useEffect } from "react";

//components
import AnimateHeight from "react-animate-height";
import { Button } from "@/components/ui/button";

//functions
import closeTabOnOutsideClick from "@/lib/closeTabOnOutsideClick";

//SVGs
import { Building } from "./svg";
import { ArrowLeft } from "lucide-react";

//hooks
import { useRouter } from "next/navigation";
import { useCurrentPlaceStore } from "@/lib/stores";

//types
import { PlacesType } from "../layout";
type MyPlacesTabType = {
  position: string;
  places: PlacesType;
  isCollapsed: boolean;
  collapsePanel: () => void;
  //   venueType: "restaurant" | "cafe" | "buffet" | "food truck";
};

export default function MyPlacesTab({
  position,
  places,
  isCollapsed,
  collapsePanel,
}: MyPlacesTabType) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  // const [currentMenu, setCurrentMenu] = useState(places[0].menu_id);
  const currentPlace = useCurrentPlaceStore((state) => state.currentPlace);
  const setCurrentPlace = useCurrentPlaceStore(
    (state) => state.updateCurrentPlace
  );
  const tab = useRef(null);

  const outsideClick = closeTabOnOutsideClick(tab);

  useEffect(() => {
    if (outsideClick) {
      setIsOpen(false);
    }
  }, [outsideClick]);

  const handleTab = () => {
    if (places.length > 1) {
      if (isCollapsed) {
        collapsePanel();
      }
      setIsOpen(!isOpen);
    }
  };

  const handleClick = (name: string, menu_id: string) => {
    setCurrentPlace(name);
    router.push(`/dashboard/${menu_id}/insights`);
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={tab}
      className={`transition-height flex ${
        isCollapsed
          ? "h-auto rounded-xl"
          : "min-h-[84px] rounded-xl rounded-tl-3xl"
      } w-full select-none flex-col overflow-hidden border-4 border-sad-blue bg-soft-blue text-primary duration-300 ease-in-out`}
    >
      <Button
        onClick={handleTab}
        className="flex h-full cursor-pointer flex-col justify-between gap-2 bg-inherit p-2 text-primary"
      >
        <section
          className={`flex w-full items-center gap-2 ${
            isCollapsed ? "justify-center py-2" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6"></Building>
            <p className={`text-xl ${isCollapsed ? "hidden" : "flex"}`}>
              مجموعه {currentPlace || places[0].name}
            </p>
          </div>
          <ArrowLeft
            className={` transition-all ${isCollapsed ? "hidden" : "flex"} ${
              !isOpen ? "rotate-0" : "-rotate-90"
            } ${places.length <= 1 ? "hidden" : "flex"}`}
          ></ArrowLeft>
        </section>
        <span
          className={`${
            isCollapsed ? "hidden" : "flex"
          } flex w-full items-center gap-2`}
        >
          <p>سمت شما</p>
          <p className=" w-max rounded-full bg-yellow-400 px-3 py-1 text-xs text-yellow-900">
            {position}
          </p>
        </span>
      </Button>
      {/* places list */}
      {places.length > 1 ? (
        <AnimateHeight duration={300} height={isOpen ? "auto" : 0}>
          <section className="p-2">
            <div className="flex w-full flex-col gap-1 rounded-lg border border-primary/30 bg-sad-blue ">
              {places.map((place) => (
                <Button
                  onClick={() => handleClick(place.name, place.menu_id)}
                  className={`${
                    (currentPlace || places[0].name) === place.name
                      ? "hidden"
                      : "flex"
                  } scale-pro justify-start gap-2 border border-sad-blue bg-sad-blue px-2 py-3 text-base font-normal text-primary transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-white`}
                >
                  <Building className="h-6 w-6"></Building>
                  {place.name}
                </Button>
              ))}
            </div>
          </section>
        </AnimateHeight>
      ) : (
        ""
      )}
    </div>
  );
}
