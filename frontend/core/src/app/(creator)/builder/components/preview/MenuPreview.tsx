"use client";

import React, { useRef } from "react";

//components
import Menu from "@/app/(menu)/[menu_id]/menu/components/Menu";
import Home from "@/app/(menu)/[menu_id]/home/components/Home";
import Image from "next/image";
import HomePagePreview from "./HomePagePreview";
import ItemsPagePreview from "./ItemsPagePreview";
import { Button } from "@/components/ui/button";

//libraries
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

//types
import { BuilderFormType } from "../builder/BuilderTest";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
import { type MenuCategory } from "@/app/types/api/menu";
import { PreviewProvider } from "./PreviewContext";
import { formToMenuGlobalStyling } from "../../utils/formToMenuGlobalStyling";

export default function MenuPreview() {
  const [activePage, setActivePage] = React.useState<
    "home" | "items" | "order"
  >("items");

  const { watch } = useFormContext<BuilderFormType>();
  const colors = watch("global_styling.color_palette");
  const data = watch();
  // const { business, global_styling, frontend_only, ...menuData } = data;
  const { globalStyling, menu } = formToMenuGlobalStyling(data);
  const globalBorderRadius = watch("global_styling.border_radius");
  // const homeImages = watch("home_images");
  // const imageUrls = homeImages.map(
  //   (img: { tempId: string; url: string }) => img.url
  // );
  // const homeTitle = watch("home_title");
  // const homeSubtitle = watch("home_subtitle");
  const mockCategories: MenuCategory[] = [
    {
      id: 265,
      business: "lamiz",
      items: [
        {
          id: 225,
          business: "lamiz",
          // branch_exceptions: null,
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
      is_active: true,
    },
    {
      id: 290,
      business: "lamiz",
      items: [],
      name: "قهوه دمی",
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
      is_active: true,
    },
    {
      id: 292,
      business: "lamiz",
      items: [],
      name: "میان وعده",
      is_active: true,
    },
  ];
  function generateStyleVars(colors: string[], globalBorderRadius: string) {
    const [primary, secondary, tertiaryMaybe, bgMaybe] = colors;
    const hasTertiary = Boolean(tertiaryMaybe);

    // Fallback color logic
    const tertiary = tertiaryMaybe || secondary;
    const background = bgMaybe || "#FFFFFF";

    return {
      /* Base Palette */
      "--primary": primary,
      "--secondary": secondary,
      "--tertiary": tertiary,
      "--bg": background,

      /* Semantic Roles */
      "--surface-main": hasTertiary ? tertiary : primary,
      "--surface-alt": hasTertiary ? secondary : primary,
      "--surface-accent": hasTertiary ? tertiary : secondary,
      "--text-main": primary,
      "--text-alt": secondary,

      /* Add to Cart Button */
      "--cart-btn-bg": hasTertiary ? tertiary : secondary,
      "--cart-btn-text": hasTertiary ? secondary : primary,
      "--cart-counter-bg": hasTertiary ? secondary : primary,
      "--cart-counter-text": hasTertiary ? tertiary : secondary,

      /* Waiter Call Button */
      "--waiter-btn-bg": hasTertiary ? tertiary : primary,
      "--waiter-btn-text": secondary,

      /* Search Button */
      "--search-btn-bg": hasTertiary ? tertiary : secondary,
      "--search-btn-text": hasTertiary ? secondary : primary,

      /* Footer Cart */
      "--footer-cart-bg": hasTertiary ? tertiary : primary,
      "--footer-cart-text": secondary,
      "--footer-cart-counter-bg": secondary,
      "--footer-cart-counter-text": hasTertiary ? tertiary : primary,

      /* Border Radius System */
      ...getRadiusVars(globalBorderRadius),
    } as const;
  }

  /* Helper for radius mapping */
  function getRadiusVars(radius: string) {
    const map = {
      sm: {
        "--radius-base": "4px",
        "--radius-inner": "3px",
        "--radius-inner-alt": "2px",
        "--radius-exception": "4px",
        "--radius-sm": "0.5rem",
        "--radius-md": "0.5rem",
        "--radius-lg": "0.5rem",
      },
      md: {
        "--radius-base": "10px",
        "--radius-inner": "6px",
        "--radius-inner-alt": "6px",
        "--radius-exception": "8px",
        "--radius-sm": "1rem",
        "--radius-md": "2rem",
        "--radius-lg": "2rem",
      },
      lg: {
        "--radius-base": "14px",
        "--radius-inner": "12px",
        "--radius-inner-alt": "10px",
        "--radius-exception": "18px",
        "--radius-sm": "3rem",
        "--radius-md": "5rem",
        "--radius-lg": "6rem",
      },
      full: {
        "--radius-base": "9999px",
        "--radius-inner": "9999px",
        "--radius-inner-alt": "9999px",
        "--radius-exception": "24px",
        "--radius-sm": "4rem",
        "--radius-md": "7rem",
        "--radius-lg": "8rem",
      },
    };
    return map[radius as keyof typeof map] || map.full;
  }

  const screenRef = useRef<HTMLDivElement>(null);
  const styleVars = generateStyleVars(colors, globalBorderRadius);

  return (
    <div
      style={styleVars as React.CSSProperties}
      className="hidden lg:flex justify-center items-center"
    >
      <div className="relative overflow-hidden w-[450px] rounded-4xl h-[760px] scale-[90%]">
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
            {/* <Home isPreview menuData={menu}></Home> */}
            <Menu
              isPreview={true}
              categories={mockCategories}
              data={menu}
              globalStyling={globalStyling}
            ></Menu>
          </PreviewProvider>
        </div>
      </div>
    </div>
  );
}
