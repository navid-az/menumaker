"use client";

import React from "react";

//components
import Image from "next/image";
import HomePagePreview from "./HomePagePreview";
import ItemsPagePreview from "./ItemsPagePreview";

//libraries
import { useFormContext } from "react-hook-form";

export default function MenuPreview() {
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
    <div style={styleVars as React.CSSProperties}>
      {!colors ? (
        <div className="relative flex h-[932px] w-[424px] scale-[70%] flex-col rounded-2xl">
          <Image
            src="/svgs/iphone.svg"
            fill
            alt="menu prototype"
            className="pointer-events-none z-50"
          ></Image>
        </div>
      ) : (
        <div className="relative flex h-[932px] w-[424px] scale-[80%] flex-col rounded-2xl">
          <Image
            src="/images/form-icons/prototype.svg"
            alt="menu prototype"
            fill
            className="pointer-events-none z-50"
          ></Image>
          <section className="hide-scrollbar relative mx-[36px] my-[85px] h-full overflow-hidden overflow-y-scroll rounded-[30px]">
            <HomePagePreview
              imageUrls={imageUrls}
              colors={colors}
              globalBorderRadius={globalBorderRadius}
              homeTitle={homeTitle}
              homeSubtitle={homeSubtitle}
            />
            {/* <ItemsPagePreview
              colors={colors}
              globalBorderRadius={globalBorderRadius}
            /> */}
          </section>
        </div>
      )}
    </div>
  );
}
