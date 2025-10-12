"use client";

import React, { useRef } from "react";

//components
import Menu from "@/app/(menu)/[menu_id]/menu/components/Menu";
import Image from "next/image";
import HomePagePreview from "./HomePagePreview";
import ItemsPagePreview from "./ItemsPagePreview";
import { Button } from "@/components/ui/button";

//libraries
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

//types
import { type MenuGlobalStyling } from "@/app/(menu)/[menu_id]/menu/page";
import { CategoriesType } from "@/app/(menu)/[menu_id]/menu/components/Items/MenuItemsWrapper";
import { PreviewProvider } from "./PreviewContext";

export default function MenuPreview() {
  const [activePage, setActivePage] = React.useState<
    "home" | "items" | "order"
  >("items");

  const { watch } = useFormContext();
  const colors = watch("global_styling.color_palette");
  const data = watch();
  const { business, global_styling, frontend_only, ...menuData } = data;
  const globalStyling = watch("global_styling");
  const globalBorderRadius = watch("global_styling.border_radius");
  const homeImages = watch("home_images");
  const imageUrls = homeImages.map(
    (img: { tempId: string; url: string }) => img.url
  );
  const homeTitle = watch("home_title");
  const homeSubtitle = watch("home_subtitle");
  const mockCategories: CategoriesType[] = [
    {
      id: 265,
      business: "lamiz",
      items: [
        {
          id: 225,
          business: "lamiz",
          branch_exceptions: null,
          name: "پن شکلاتی",
          description: "خمیر هزار لایه، کره نیوزلندی، شکلات میله ای",
          image: "/media/menu/items/images/PAIN-AU-CHOCOLAT-LAMIZ.webp",
          price: 108000,
          is_available: true,
          is_active: true,
          category: 265,
        },
      ],
      name: "کیک ها",
      text_color: "#FFFFFF",
      child_bg: "#FFFFFF",
      parent_bg: "#FFFFFF",
      is_active: true,
    },
    {
      id: 266,
      business: "lamiz",
      items: [
        {
          id: 233,
          business: "lamiz",
          branch_exceptions: null,
          name: "آمریکانو سرد",
          description: "شات اسپرسو، آب سرد تصفیه شده، یخ",
          image: "/media/menu/items/images/ICED-AMERICANO-LAMIZ.webp",
          price: 118000,
          is_available: true,
          is_active: true,
          category: 266,
        },
      ],
      name: "نوشیدنی سرد",
      text_color: "#FFFFFF",
      child_bg: "#FFFFFF",
      parent_bg: "#FFFFFF",
      is_active: true,
    },
    {
      id: 271,
      business: "lamiz",
      items: [
        {
          id: 223,
          business: "lamiz",
          branch_exceptions: null,
          name: "قهوه دمی",
          description: "قهوه دمی دستگاهی",
          image: "/media/menu/items/images/DAILY-BREW-LAMIZ.webp",
          price: 138000,
          is_available: true,
          is_active: true,
          category: 271,
        },
        {
          id: 224,
          business: "lamiz",
          branch_exceptions: null,
          name: "اسپرسو کان‌پانا",
          description: "اسپرسو، خامه",
          image: "/media/menu/items/images/ESPRESSO-CON-PANNA-LAMIZ.webp",
          price: 114800,
          is_available: true,
          is_active: true,
          category: 271,
        },
      ],
      name: "نوشیدنی گرم",
      text_color: "#FFFFFF",
      child_bg: "#FFFFFF",
      parent_bg: "#FFFFFF",
      is_active: true,
    },
    {
      id: 290,
      business: "lamiz",
      items: [],
      name: "قهوه دمی",
      text_color: "#FFFFFF",
      child_bg: "#FFFFFF",
      parent_bg: "#FFFFFF",
      is_active: true,
    },
    {
      id: 291,
      business: "lamiz",
      items: [
        {
          id: 227,
          business: "lamiz",
          branch_exceptions: null,
          name: "منگو ماچا",
          description: "",
          image: "/media/menu/items/images/Mango-Matcha-Lamiz.webp",
          price: 258800,
          is_available: true,
          is_active: true,
          category: 291,
        },
        {
          id: 228,
          business: "lamiz",
          branch_exceptions: null,
          name: "اسلاشی آناناس و ریحان",
          description: "",
          image: "/media/menu/items/images/Pineapple-Basil-Slushy-LAmiz.webp",
          price: 184800,
          is_available: true,
          is_active: true,
          category: 291,
        },
        {
          id: 229,
          business: "lamiz",
          branch_exceptions: null,
          name: "فیزی بلک",
          description: "اسپرسو جفت شات، سیروپ تریپل سک، لیمو، آب گازدار، یخ",
          image: "/media/menu/items/images/Fizzy-Black-Lamiz.webp",
          price: 184800,
          is_available: true,
          is_active: true,
          category: 291,
        },
      ],
      name: "نوشیدنی فصلی",
      text_color: "#FFFFFF",
      child_bg: "#FFFFFF",
      parent_bg: "#FFFFFF",
      is_active: true,
    },
    {
      id: 292,
      business: "lamiz",
      items: [],
      name: "میان وعده",
      text_color: "#FFFFFF",
      child_bg: "#FFFFFF",
      parent_bg: "#FFFFFF",
      is_active: true,
    },
  ];

  const styleVars = {
    "--primary": colors[0],
    "--secondary": colors[1],
    "--tertiary": colors[2],
    "--bg": colors[3],
    "--radius-base":
      globalBorderRadius === "sm"
        ? "4px"
        : globalBorderRadius === "md"
        ? "10px"
        : globalBorderRadius === "lg"
        ? "14px"
        : "9999px", // full
    "--radius-inner":
      globalBorderRadius === "sm"
        ? "3px"
        : globalBorderRadius === "md"
        ? "8px"
        : globalBorderRadius === "lg"
        ? "10px"
        : "9999px", // full,
    "--radius-inner-alt":
      globalBorderRadius === "sm"
        ? "2px"
        : globalBorderRadius === "md"
        ? "6px"
        : globalBorderRadius === "lg"
        ? "10px"
        : "9999px", // full,
    "--radius-exception":
      globalBorderRadius === "sm"
        ? "4px"
        : globalBorderRadius === "md"
        ? "10px"
        : globalBorderRadius === "lg"
        ? "18px"
        : "26px", // full,
  };

  const screenRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={styleVars as React.CSSProperties}
      className="hidden lg:flex justify-center items-center"
    >
      <div className="relative overflow-hidden w-[400px] rounded-4xl h-[760px] scale-[90%]">
        {/* <Image
          src="/svgs/iphone-frame.svg"
          alt="iPhone frame"
          fill
          className="pointer-events-none z-50"
          priority
        /> */}
        <div
          ref={screenRef}
          className="relative w-full h-full overflow-y-scroll overflow-hidden hide-scrollbar rounded-4xl border-3 border-primary/20"
        >
          <PreviewProvider container={screenRef.current}>
            <Menu
              isPreview={true}
              categories={mockCategories}
              data={menuData}
              globalStyling={globalStyling as MenuGlobalStyling}
            ></Menu>
          </PreviewProvider>
        </div>
      </div>
    </div>
  );
}
