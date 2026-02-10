"use client";

import { useState, useEffect } from "react";

// components
import { MenuItemCard } from "./MenuItemCard";

// libraries
import { cn } from "@/lib/utils";
import { InView } from "react-intersection-observer";

// hooks
import { useSearchParams } from "next/navigation";
import { useCategoryBtn, useSearchBar } from "@/lib/stores";

// types
import { type MenuCategory } from "@/app/types/api/menu";
import { type MenuUI, type MenuGlobalStylingUI } from "@/app/types/ui/menu";

export default function MenuItemsWrapper({
  categories,
  menuData,
  globalStyling,
}: {
  categories: MenuCategory[];
  menuData: MenuUI;
  globalStyling: MenuGlobalStylingUI;
}) {
  const searchParams = useSearchParams();
  const tableCode = searchParams.get("t");

  // check if tableCode exists and if it has a session
  // if not, check the session for the tableCode
  useEffect(() => {
    if (!tableCode) return;

    const checkOrCreateSession = async () => {
      try {
        // First, check for existing session
        const getRes = await fetch(
          `http://localhost:8000/tables/${tableCode}/sessions/`,
          { method: "GET" }
        );
        const getData = await getRes.json();

        if (getRes.ok) {
          if (getData.session_code) {
            // Active session exists, store it
            sessionStorage.setItem("session_code", getData.session_code);
          } else if (getData.status === "no_active_session") {
            // No active session, create one
            const postRes = await fetch(
              `http://localhost:8000/tables/${tableCode}/sessions/`,
              { method: "POST" }
            );
            const postData = await postRes.json();

            if (postRes.ok && postData.session_code) {
              sessionStorage.setItem("session_code", postData.session_code);
            } else {
              console.error("Failed to create session:", postData);
            }
          }
        } else {
          console.error("Failed to check session:", getData);
        }
      } catch (error) {
        console.error("Error checking/creating table session:", error);
      }
    };

    checkOrCreateSession();
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
    <section
      className={cn(
        "flex h-max w-full flex-col gap-4 pb-4 px-4",
        menuData.items_page_layout === "vertical" && "mr-4 px-0 mt-4"
      )}
    >
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
                    className="grid h-auto grid-cols-2 gap-4"
                  >
                    {category.items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        {...item}
                        style={menuData.items_display_type}
                        globalStyling={globalStyling}
                      ></MenuItemCard>
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
