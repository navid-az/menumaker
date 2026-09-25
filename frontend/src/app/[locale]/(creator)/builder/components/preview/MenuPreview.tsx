"use client";

import React, { useRef } from "react";

//components
import MenuLayout from "@/app/[locale]/(menu)/[business_slug]/components/MenuLayout";
import HomeLayout from "@/app/[locale]/(menu)/[business_slug]/(public-menu)/home/components/HomeLayout";
import CartLayout from "@/app/[locale]/(menu)/[business_slug]/(public-menu)/orders/components/CartLayout";

//libraries
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

//utils
import { generateStyleVars } from "@/app/[locale]/(menu)/[business_slug]/utilities/styleVars";
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

  const t = useTranslations('builder.builder.preview')

  const mockCategories: MenuCategory[] = [
    {
      id: 1,
      business: "lamiz",
      name: t("categories.pizza.name"),
      is_active: true,
      items: [
        {
          id: 1,
          business: "lamiz",
          name: t("items.margheritaPizza.name"),
          description: t("items.margheritaPizza.description"),
          item_images: [
            {
              id: 1,
              url: "/images/preview-screen/margarita-pizza.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 365000,
          is_available: true,
          is_active: true,
          category: 1,
        },
        {
          id: 2,
          business: "lamiz",
          name: t("items.pepperoniPizza.name"),
          description: t("items.pepperoniPizza.description"),
          item_images: [
            {
              id: 2,
              url: "/images/preview-screen/pepperoni-pizza.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 415000,
          is_available: true,
          is_active: true,
          category: 1,
        },
        {
          id: 3,
          business: "lamiz",
          name: t("items.calzone.name"),
          description: t("items.calzone.description"),
          item_images: [
            {
              id: 3,
              url: "/images/preview-screen/calzone.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 445000,
          is_available: true,
          is_active: true,
          category: 1,
        },
        {
          id: 4,
          business: "lamiz",
          name: t("items.fourCheesePizza.name"),
          description: t("items.fourCheesePizza.description"),
          item_images: [
            {
              id: 4,
              url: "/images/preview-screen/cheese-pizza.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 495000,
          is_available: true,
          is_active: true,
          category: 1,
        },
        {
          id: 23,
          business: "lamiz",
          name: t("items.beefMushroomPizza.name"),
          description: t("items.beefMushroomPizza.description"),
          item_images: [
            {
              id: 23,
              url: "/images/preview-screen/mushroom-pizza.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
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
      name: t("categories.burgers.name"),
      is_active: true,
      items: [
        {
          id: 5,
          business: "lamiz",
          name: t("items.mushroomBurger.name"),
          description: t("items.mushroomBurger.description"),
          item_images: [
            {
              id: 5,
              url: "/images/preview-screen/mushroom-burger.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 345000,
          is_available: true,
          is_active: true,
          category: 2,
        },
        {
          id: 6,
          business: "lamiz",
          name: t("items.classicCheeseburger.name"),
          description: t("items.classicCheeseburger.description"),
          item_images: [
            {
              id: 6,
              url: "/images/preview-screen/classic-burger.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 315000,
          is_available: true,
          is_active: true,
          category: 2,
        },
        {
          id: 7,
          business: "lamiz",
          name: t("items.doubleBurger.name"),
          description: t("items.doubleBurger.description"),
          item_images: [
            {
              id: 7,
              url: "/images/preview-screen/double-burger.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 445000,
          is_available: true,
          is_active: true,
          category: 2,
        },
        {
          id: 27,
          business: "lamiz",
          name: t("items.baconBurger.name"),
          description: t("items.baconBurger.description"),
          item_images: [
            {
              id: 27,
              url: "/images/preview-screen/bacon-burger.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 395000,
          is_available: true,
          is_active: true,
          category: 2,
        },
        {
          id: 29,
          business: "lamiz",
          name: t("items.crispyChickenBurger.name"),
          description: t("items.crispyChickenBurger.description"),
          item_images: [
            {
              id: 29,
              url: "/images/preview-screen/fried-chicken-burger.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
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
      name: t("categories.pasta.name"),
      is_active: true,
      items: [
        {
          id: 8,
          business: "lamiz",
          name: t("items.chickenAlfredoPasta.name"),
          description: t("items.chickenAlfredoPasta.description"),
          item_images: [
            {
              id: 8,
              url: "/images/preview-screen/alfredo-pasta.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 355000,
          is_available: true,
          is_active: true,
          category: 3,
        },
        {
          id: 32,
          business: "lamiz",
          name: t("items.pestoPasta.name"),
          description: t("items.pestoPasta.description"),
          item_images: [
            {
              id: 32,
              url: "/images/preview-screen/pesto-pasta.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 395000,
          is_available: true,
          is_active: true,
          category: 3,
        },
        {
          id: 34,
          business: "lamiz",
          name: t("items.chickenParmesanPasta.name"),
          description: t("items.chickenParmesanPasta.description"),
          item_images: [
            {
              id: 34,
              url: "/images/preview-screen/chicken-parmesan-pasta.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 415000,
          is_available: true,
          is_active: true,
          category: 3,
        },
        {
          id: 35,
          business: "lamiz",
          name: t("items.beefLasagna.name"),
          description: t("items.beefLasagna.description"),
          item_images: [
            {
              id: 35,
              url: "/images/preview-screen/lasagna.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
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
      name: t("categories.appetizers.name"),
      is_active: true,
      items: [
        {
          id: 10,
          business: "lamiz",
          name: t("items.baconCheeseFries.name"),
          description: t("items.baconCheeseFries.description"),
          item_images: [
            {
              id: 10,
              url: "/images/preview-screen/bacon-cheese-fries.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
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
      name: t("categories.sandwiches.name"),
      is_active: true,
      items: [
        {
          id: 11,
          business: "lamiz",
          name: t("items.roastBeefSandwich.name"),
          description: t("items.roastBeefSandwich.description"),
          item_images: [
            {
              id: 11,
              url: "/images/preview-screen/roast-beef-sandwich.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 385000,
          is_available: true,
          is_active: true,
          category: 5,
        },
        {
          id: 12,
          business: "lamiz",
          name: t("items.chickenFilletSandwich.name"),
          description: t("items.chickenFilletSandwich.description"),
          item_images: [
            {
              id: 12,
              url: "/images/preview-screen/grilled-chicken-sandwich.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
          price: 325000,
          is_available: true,
          is_active: true,
          category: 5,
        },
        {
          id: 13,
          business: "lamiz",
          name: t("items.specialHotDog.name"),
          description: t("items.specialHotDog.description"),
          item_images: [
            {
              id: 13,
              url: "/images/preview-screen/hotdog.webp",
              media_type: "image",
              collection: "item_gallery",
              order: 0,
            },
          ],
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
