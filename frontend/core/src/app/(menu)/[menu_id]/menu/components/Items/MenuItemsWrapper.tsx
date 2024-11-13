"use client";

//components
import { MenuItem } from "./MenuItem";
import ItemsCategoryTitle from "../ItemsCategoryTitle";
import { Skeleton } from "@/components/ui/skeleton";

//libraries
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InView } from "react-intersection-observer";

//hooks
import { useCategoryBtn } from "@/lib/stores";

//types
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
  params,
  globalStyling,
}: {
  params: { menu_id: string };
  globalStyling: MenuGlobalStyling;
}) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/${params.menu_id}/categories`
      );
      return data as CategoriesType[];
    },
  });

  // if (isError) {
  //   const errorMessage = (error as Error).message;
  //   return <span>Error: {errorMessage}</span>;
  // }

  const setActiveCategory = useCategoryBtn(
    (state) => state.updateActiveCategory
  );

  const setInView = (inView: boolean, entry: IntersectionObserverEntry) => {
    if (inView) {
      setActiveCategory(entry.target.getAttribute("id") as string);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 px-2 pb-2">
      {!isLoading ? (
        data?.map(
          (category) =>
            category["items"].length > 0 && (
              <InView onChange={setInView} rootMargin="-80%" key={category.id}>
                {({ ref }) => {
                  return (
                    <section
                      ref={ref}
                      key={category.id}
                      id={category.id.toString()}
                    >
                      <ItemsCategoryTitle
                        categoryIcon={category.icon.image}
                        categoryName={category.name}
                      />
                      <div className="relative grid w-full grid-cols-2 justify-between gap-2">
                        {category["items"].map((item) => (
                          <MenuItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            is_available={item.is_available}
                            price={item.price}
                            image={item.image}
                            animations={globalStyling.click_animation}
                          ></MenuItem>
                        ))}
                      </div>
                    </section>
                  );
                }}
              </InView>
            )
        )
      ) : (
        <>
          <Skeleton className="h-52 w-full rounded-3xl bg-orange-400/50 xs:h-64 x:h-72"></Skeleton>
          <Skeleton className="h-52 w-full rounded-3xl bg-orange-400/50 xs:h-64 x:h-72"></Skeleton>
          <Skeleton className="h-52 w-full rounded-3xl bg-orange-400/50 xs:h-64 x:h-72"></Skeleton>
          <Skeleton className="h-52 w-full rounded-3xl bg-orange-400/50 xs:h-64 x:h-72"></Skeleton>
          <Skeleton className="h-52 w-full rounded-3xl bg-orange-400/50 xs:h-64 x:h-72"></Skeleton>
        </>
      )}
    </div>
  );
}
