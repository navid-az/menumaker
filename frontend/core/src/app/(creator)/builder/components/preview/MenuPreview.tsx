"use client";

import React from "react";

//components
import Image from "next/image";
import HomePagePreview from "./HomePagePreview";
import ItemsPagePreview from "./ItemsPagePreview";
import { Button } from "@/components/ui/button";

//libraries
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function MenuPreview() {
  const [activePage, setActivePage] = React.useState<
    "home" | "items" | "order"
  >("items");

  const { watch } = useFormContext();
  const colors = watch("global_styling.color_palette");
  const globalBorderRadius = watch("global_styling.border_radius");
  const homeImages = watch("home_images");
  const imageUrls = homeImages.map(
    (img: { tempId: string; url: string }) => img.url
  );
  const homeTitle = watch("home_title");
  const homeSubtitle = watch("home_subtitle");

  const styleVars = {
    "--primary": colors[0],
    "--secondary": colors[1],
    "--tertiary": colors[2],
    "--bg": colors[3],
    "--radius-base":
      globalBorderRadius === "sm"
        ? "4px"
        : globalBorderRadius === "md"
        ? "6px"
        : globalBorderRadius === "lg"
        ? "8px"
        : "9999px", // full
    "--radius-inner":
      globalBorderRadius === "sm"
        ? "2px"
        : globalBorderRadius === "md"
        ? "4px"
        : globalBorderRadius === "lg"
        ? "6px"
        : "9999px", // full,
    "--radius-exception":
      globalBorderRadius === "sm"
        ? "2px"
        : globalBorderRadius === "md"
        ? "4px"
        : globalBorderRadius === "lg"
        ? "6px"
        : "24px", // full,
  };

  return (
    <div
      style={styleVars as React.CSSProperties}
      className="hidden lg:flex justify-center items-center"
    >
      <div className="relative w-[400px] h-[820px] scale-[85%]">
        <Image
          src="/svgs/iphone-frame.svg"
          alt="iPhone frame"
          fill
          className="pointer-events-none z-50"
          priority
        />
        <div className="absolute overflow-y-scroll hide-scrollbar inset-[20px_19px_20px_19px] rounded-[30px]">
          {activePage === "home" ? (
            <HomePagePreview
              imageUrls={imageUrls}
              colors={colors}
              globalBorderRadius={globalBorderRadius}
              homeTitle={homeTitle}
              homeSubtitle={homeSubtitle}
            />
          ) : activePage === "items" ? (
            <ItemsPagePreview
              colors={colors}
              globalBorderRadius={globalBorderRadius}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="hidden xl:flex flex-col gap-2">
        <Button
          onClick={() => setActivePage("home")}
          className={cn(
            "bg-primary text-primary",
            activePage === "home" && "bg-black text-white"
          )}
        >
          صفحه اصلی
        </Button>
        <Button
          onClick={() => setActivePage("items")}
          className={cn(
            "bg-primary text-primary",
            activePage === "items" && "bg-black text-white"
          )}
        >
          صفحه آیتم ها
        </Button>
      </div>
    </div>
  );
}
