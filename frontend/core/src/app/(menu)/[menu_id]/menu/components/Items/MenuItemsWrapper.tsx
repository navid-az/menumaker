"use client";

import { useState, useEffect } from "react";

// components
import { MenuItem } from "./MenuItem";

// libraries
import { InView } from "react-intersection-observer";

// hooks
import { useSearchParams } from "next/navigation";
import { useCategoryBtn, useSearchBar } from "@/lib/stores";

// types
import { type MenuItemType } from "./MenuItem";
import { type MenuGlobalStyling } from "../../page";
export type CategoriesType = {
  id: number;
  menu: string;
  items: MenuItemType[];
  icon: {
    name: string;
    image: string;
  };
  name: string;
  text_color: string;
  child_bg: string;
  parent_bg: string;
  is_active: boolean;
};

export default function MenuItemsWrapper({
  categories,
  params,
  globalStyling,
}: {
  categories: CategoriesType[];
  params: { menu_id: string };
  globalStyling: MenuGlobalStyling;
}) {
  const searchParams = useSearchParams();
  const tableCode = searchParams.get("t");

  // check if tableCode exists and if it has a session
  // if not, check the session for the tableCode
  useEffect(() => {
    if (!tableCode) return;
    const checkSession = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/business/tables/${tableCode}/check-session/`,
          { method: "GET" }
        );
        const data = await res.json();
        if (res.ok) {
          // Store session_code in localStorage
          sessionStorage.setItem("session_code", data.session_code);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error("Error checking table session:", error);
      }
    };

    checkSession();
  }, [tableCode]);

  const { updateActiveCategory } = useCategoryBtn();
  const { searchQuery } = useSearchBar();

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const setInView = (inView: boolean, entry: IntersectionObserverEntry) => {
    const { isAutoScrolling } = useCategoryBtn.getState();

    if (inView && !isAutoScrolling) {
      const id = entry.target.getAttribute("id");
      if (id) {
        updateActiveCategory(id);
      }
    }
  };

  const filteredCategories = categories.map((category) => {
    const filteredItems = category.items.filter((item) => {
      const words = item.name.toLowerCase().split(" ");
      return words.some((word) => word.startsWith(debouncedQuery));
    });

    return { ...category, items: filteredItems };
  });

  //debounce input
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <section className="flex h-max w-full flex-col gap-4 pb-4">
      {(filteredCategories.length > 0 ? filteredCategories : categories).map(
        (category) =>
          category.items.length > 0 && (
            <InView onChange={setInView} threshold={1} key={category.id}>
              {({ ref }) => {
                return (
                  <section
                    ref={ref}
                    key={category.id}
                    id={category.id.toString()}
                    className="grid h-auto grid-cols-2 gap-4 px-4"
                  >
                    {category.items.map((item) => (
                      <MenuItem
                        key={item.id}
                        {...item}
                        globalStyling={globalStyling}
                      ></MenuItem>
                    ))}
                  </section>
                );
              }}
            </InView>
          )
      )}
    </section>
  );
}
