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
  //   venueType: "restaurant" | "cafe" | "buffet" | "food truck";
};

export default function MyPlacesTab({ position, places }: MyPlacesTabType) {
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
      setIsOpen(!isOpen);
    }
  };

  const handleClick = (name: string, menu_id: string) => {
    setCurrentPlace(name);
    router.push(`/dashboard/${menu_id}/insights`);
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-1">
      <div
        ref={tab}
        className={`transition-height flex min-h-[84px] w-full select-none flex-col overflow-hidden rounded-xl rounded-tl-3xl border-4 border-sad-blue bg-soft-blue p-2 text-primary duration-300 ease-in-out`}
      >
        <Button
          onClick={handleTab}
          className="flex h-auto cursor-pointer flex-col justify-between gap-2 bg-inherit p-0 text-primary"
        >
          <section className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6"></Building>
              <p className=" text-xl">
                مجموعه {currentPlace || places[0].name}
              </p>
            </div>
            <ArrowLeft
              className={` transition-all ${
                !isOpen ? "rotate-0" : "-rotate-90"
              } ${places.length <= 1 ? "hidden" : "flex"}`}
            ></ArrowLeft>
          </section>
          <span className="flex w-full items-center gap-2">
            <p>سمت شما</p>
            <p className=" w-max rounded-full bg-yellow-400 px-3 py-1 text-xs text-yellow-900">
              {position}
            </p>
          </span>
        </Button>
        {/* places list */}
        {places.length > 1 ? (
          <AnimateHeight duration={300} height={isOpen ? "auto" : 0}>
            <section
              className={`mt-2 flex w-full flex-col gap-1 rounded-lg border border-primary/30 bg-sad-blue p-1`}
            >
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
            </section>
          </AnimateHeight>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
