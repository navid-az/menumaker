"use client";

import React, { useState, useRef, useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

//components
import AnimateHeight from "react-animate-height";
import { Button } from "@/components/ui/button";

//hooks
import { useCurrentBusinessStore } from "@/lib/stores";
import useClickOutside from "@/app/hooks/useClickOutside";

//SVGs
import { Building } from "./svg";
import { ArrowLeft } from "lucide-react";

//types
import { BusinessType } from "../layout";

type MyBusinessesTabType = {
  position: string;
  businesses: BusinessType[];
  isCollapsed: boolean;
  collapsePanel: () => void;
  //   venueType: "restaurant" | "cafe" | "buffet" | "food truck";
};

export default function MyBusinessesTab({
  position,
  businesses,
  isCollapsed,
  collapsePanel,
}: MyBusinessesTabType) {
  const router = useRouter();
  const tab = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const currentBusiness = useCurrentBusinessStore(
    (state) => state.currentBusiness
  );
  const setCurrentBusiness = useCurrentBusinessStore(
    (state) => state.updateCurrentBusiness
  );

  const outsideClick = useClickOutside(tab);
  const pathname = usePathname();

  //collapse Tab on outside click
  useEffect(() => {
    if (outsideClick) {
      setIsOpen(false);
    }
  }, [outsideClick]);

  // Tab's opening/closing functionality
  const handleTab = () => {
    if (businesses.length > 1) {
      if (isCollapsed) {
        collapsePanel();
      }
      setIsOpen(!isOpen);
    }
  };

  // change path on business select
  const handleClick = (business: BusinessType) => {
    const pathSegments = pathname.split("/");
    // update current path with new business_slug
    pathSegments[2] = business.slug;
    // update current path with new branch_slug
    pathSegments[3] = business.branches[0].slug;

    // Reconstruct the new path
    const newPath = pathSegments.join("/");

    setCurrentBusiness(business.name);
    router.push(newPath);
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
              مجموعه {currentBusiness || businesses[0].name}
            </p>
          </div>
          <ArrowLeft
            className={` transition-all ${isCollapsed ? "hidden" : "flex"} ${
              !isOpen ? "rotate-0" : "-rotate-90"
            } ${businesses.length <= 1 ? "hidden" : "flex"}`}
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
      {/* businesses list */}
      {businesses.length > 1 ? (
        <AnimateHeight duration={300} height={isOpen ? "auto" : 0}>
          <section className="p-2">
            <div className="flex w-full flex-col gap-1 rounded-lg border border-primary/30 bg-sad-blue ">
              {businesses.map((business) => (
                <Button
                  key={business.id}
                  onClick={() => handleClick(business)}
                  className={`${
                    (currentBusiness || businesses[0].slug) === business.name
                      ? "hidden"
                      : "flex"
                  } scale-pro justify-start gap-2 border border-sad-blue bg-sad-blue px-2 py-3 text-base font-normal text-primary transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-white`}
                >
                  <Building className="h-6 w-6"></Building>
                  {business.name}
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
