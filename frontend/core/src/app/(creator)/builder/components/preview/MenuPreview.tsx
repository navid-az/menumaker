"use client";

import React, { useRef } from "react";

//components
import MenuLayout from "@/app/(menu)/[menu_id]/components/MenuLayout";
import HomeLayout from "@/app/(menu)/[menu_id]/home/components/HomeLayout";
import Cart from "@/app/(menu)/[menu_id]/orders/components/Cart";

//libraries
import { useFormContext } from "react-hook-form";

//utils
import { generateStyleVars } from "@/app/(menu)/[menu_id]/utilities/styleVars";
import { formToMenuGlobalStyling } from "../../utils/formToMenuGlobalStyling";

//types
import { type BuilderFormType } from "../builder/BuilderTest";
import { type MenuCategory } from "@/app/types/api/menu";
import { type ActivePreviewPage, PreviewProvider } from "./PreviewContext";

export default function MenuPreview() {
  const [activePage, setActivePage] = React.useState<ActivePreviewPage>("home");

  const { watch } = useFormContext<BuilderFormType>();
  const data = watch();

  //separates and normalizes form data
  const { globalStyling, menu } = formToMenuGlobalStyling(data);

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

  const screenRef = useRef<HTMLDivElement>(null);

  //generate style variables
  const colors = [
    globalStyling.primary_color,
    globalStyling.secondary_color,
    globalStyling.tertiary_color,
    globalStyling.bg_color,
  ];
  const styleVars = generateStyleVars(colors, globalStyling.border_radius);

  //render active preview page according to activePage state
  function renderActivePage() {
    switch (activePage) {
      case "home":
        return <HomeLayout menuData={menu} globalStyling={globalStyling} />;
      case "menu":
        return (
          <MenuLayout
            menuData={menu}
            globalStyling={globalStyling}
            categories={mockCategories}
          />
        );
      case "cart":
        return <Cart globalStyling={globalStyling} isPreview />;
      default:
        return null;
    }
  }

  return (
    <div
      ref={screenRef}
      style={styleVars as React.CSSProperties}
      className="relative overflow-hidden w-[450px] h-[760px] scale-[90%] rounded-(--radius-preview) border-3 border-(--tertiary) transition-all duration-300"
    >
      <div className="relative w-full h-full overflow-y-scroll overflow-hidden hide-scrollbar">
        <PreviewProvider
          container={screenRef.current}
          setActivePage={setActivePage}
        >
          {renderActivePage()}
        </PreviewProvider>
      </div>
    </div>
  );
}
