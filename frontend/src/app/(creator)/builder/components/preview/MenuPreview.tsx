"use client";

import React, { useRef } from "react";

//components
import MenuLayout from "@/app/(menu)/[business_slug]/components/MenuLayout";
import HomeLayout from "@/app/(menu)/[business_slug]/(public-menu)/home/components/HomeLayout";
import CartLayout from "@/app/(menu)/[business_slug]/(public-menu)/orders/components/CartLayout";

//libraries
import { useFormContext } from "react-hook-form";

//utils
import { generateStyleVars } from "@/app/(menu)/[business_slug]/utilities/styleVars";
import { formToMenuGlobalStyling } from "../../utils/formToMenuGlobalStyling";

//types
import { type BuilderFormType } from "../builder/BuilderTest";
import { type MenuCategory } from "@/app/types/api/menu";
import { type ActivePreviewPage, PreviewProvider } from "./PreviewContext";

export default function MenuPreview() {
  const [activePage, setActivePage] = React.useState<ActivePreviewPage>("menu");

  const { watch } = useFormContext<BuilderFormType>();
  const data = watch();

  //separates and normalizes form data
  const { globalStyling, menu } = formToMenuGlobalStyling(data);

  const mockCategories: MenuCategory[] = [
    {
      id: 1,
      business: "lamiz",
      name: "پیتزا",
      is_active: true,
      items: [
        {
          id: 1,
          business: "lamiz",
          name: "پیتزا مارگاریتا",
          description: "سس گوجه، پنیر موزارلا، ریحان تازه",
          image: "/images/preview-screen/margarita-pizza.webp",
          price: 365000,
          is_available: true,
          is_active: true,
          category: 1,
        },
        {
          id: 2,
          business: "lamiz",
          name: "پیتزا پپرونی",
          description: "پپرونی، پنیر موزارلا و سس مخصوص",
          image: "/images/preview-screen/pepperoni-pizza.webp",
          price: 415000,
          is_available: true,
          is_active: true,
          category: 1,
        },
        {
          id: 3,
          business: "lamiz",
          name: "کالزونه",
          description: "خمیر دست‌ساز، ژامبون، قارچ و پنیر موزارلا",
          image: "/images/preview-screen/calzone.webp",
          price: 445000,
          is_available: true,
          is_active: true,
          category: 1,
        },
        {
          id: 4,
          business: "lamiz",
          name: "پیتزا چهار پنیر",
          description: "موزارلا، پارمزان، گودا و بلوچیز",
          image: "/images/preview-screen/cheese-pizza.webp",
          price: 495000,
          is_available: true,
          is_active: true,
          category: 1,
        },
        {
          id: 23,
          business: "lamiz",
          name: "پیتزا گوشت و قارچ",
          description: "گوشت مزه‌دار، قارچ تازه و پنیر موزارلا",
          image: "/images/preview-screen/mushroom-pizza.webp",
          price: 465000,
          is_available: true,
          is_active: true,
          category: 1,
        },
      ],
    },
    {
      id: 2,
      business: "lamiz",
      name: "برگر",
      is_active: true,
      items: [
        {
          id: 5,
          business: "lamiz",
          name: "ماشروم برگر",
          description: "برگر گوشت ۱۸۰ گرمی، قارچ گریل شده و پنیر چدار",
          image: "/images/preview-screen/mushroom-burger.webp",
          price: 345000,
          is_available: true,
          is_active: true,
          category: 2,
        },
        {
          id: 6,
          business: "lamiz",
          name: "چیز برگر کلاسیک",
          description: "گوشت گریل شده، پنیر چدار، کاهو و سس مخصوص",
          image: "/images/preview-screen/classic-burger.webp",
          price: 315000,
          is_available: true,
          is_active: true,
          category: 2,
        },
        {
          id: 7,
          business: "lamiz",
          name: "دبل برگر",
          description: "دو لایه گوشت، پنیر چدار و پیاز کاراملی",
          image: "/images/preview-screen/double-burger.webp",
          price: 445000,
          is_available: true,
          is_active: true,
          category: 2,
        },
        {
          id: 27,
          business: "lamiz",
          name: "بیکن برگر",
          description: "گوشت ۱۸۰ گرمی، بیکن بوقلمون، پنیر چدار و سس باربیکیو",
          image: "/images/preview-screen/bacon-burger.webp",
          price: 395000,
          is_available: true,
          is_active: true,
          category: 2,
        },
        {
          id: 29,
          business: "lamiz",
          name: "کرسپی چیکن برگر",
          description: "فیله مرغ سوخاری، پنیر چدار، کاهو و سس سیر",
          image: "/images/preview-screen/fried-chicken-burger.webp",
          price: 355000,
          is_available: true,
          is_active: true,
          category: 2,
        },
      ],
    },
    {
      id: 3,
      business: "lamiz",
      name: "پاستا",
      is_active: true,
      items: [
        {
          id: 8,
          business: "lamiz",
          name: "پاستا آلفردو",
          description: "فیله مرغ، قارچ و سس آلفردو",
          image: "/images/preview-screen/alfredo-pasta.webp",
          price: 355000,
          is_available: true,
          is_active: true,
          category: 3,
        },
        {
          id: 32,
          business: "lamiz",
          name: "پاستا پستو",
          description: "پنه، مرغ گریل، سس پستو و پنیر پارمزان",
          image: "/images/preview-screen/pesto-pasta.webp",
          price: 395000,
          is_available: true,
          is_active: true,
          category: 3,
        },
        {
          id: 34,
          business: "lamiz",
          name: "پاستا چیکن پارمزان",
          description: "مرغ سوخاری، سس گوجه و پنیر پارمزان",
          image: "/images/preview-screen/chicken-parmesan-pasta.webp",
          price: 415000,
          is_available: true,
          is_active: true,
          category: 3,
        },
        {
          id: 35,
          business: "lamiz",
          name: "لازانیا گوشت",
          description: "لازانیا با گوشت، سس بشامل و پنیر موزارلا",
          image: "/images/preview-screen/lasagna.webp",
          price: 425000,
          is_available: true,
          is_active: true,
          category: 3,
        },
      ],
    },
    {
      id: 4,
      business: "lamiz",
      name: "پیش غذا",
      is_active: true,
      items: [
        {
          id: 10,
          business: "lamiz",
          name: "سیب زمینی با پنیر و بیکن",
          description: "سیب زمینی سرخ شده، پنیر چدار و بیکن بوقلمون",
          image: "/images/preview-screen/bacon-cheese-fries.webp",
          price: 195000,
          is_available: true,
          is_active: true,
          category: 4,
        },
      ],
    },
    {
      id: 5,
      business: "lamiz",
      name: "ساندویچ",
      is_active: true,
      items: [
        {
          id: 11,
          business: "lamiz",
          name: "ساندویچ رست بیف",
          description: "گوشت رست شده، پنیر گودا، پیاز کاراملی و سس مخصوص",
          image: "/images/preview-screen/roast-beef-sandwich.webp",
          price: 385000,
          is_available: true,
          is_active: true,
          category: 5,
        },
        {
          id: 12,
          business: "lamiz",
          name: "چیکن فیله",
          description: "فیله مرغ سوخاری، کاهو، خیارشور و سس سیر",
          image: "/images/preview-screen/grilled-chicken-sandwich.webp",
          price: 325000,
          is_available: true,
          is_active: true,
          category: 5,
        },
        {
          id: 13,
          business: "lamiz",
          name: "هات داگ ویژه",
          description: "هات داگ آلمانی، پنیر چدار، قارچ و سیب زمینی خلال",
          image: "/images/preview-screen/hotdog.webp",
          price: 315000,
          is_available: true,
          is_active: true,
          category: 5,
        },
      ],
    },
  ];

  const mockItems = mockCategories.flatMap((category) => category.items);

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
        return (
          <CartLayout
            items={mockItems}
            globalStyling={globalStyling}
          ></CartLayout>
        );
      default:
        return null;
    }
  }

  return (
    <div
      ref={screenRef}
      style={styleVars as React.CSSProperties}
      className="relative items-center flex h-screen overflow-hidden w-[450px] scale-[90%] rounded-(--radius-preview) border-4 border-(--tertiary) transition-all duration-300"
    >
      <div className="relative bg-(--bg) w-full h-full overflow-y-scroll overflow-hidden hide-scrollbar">
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
