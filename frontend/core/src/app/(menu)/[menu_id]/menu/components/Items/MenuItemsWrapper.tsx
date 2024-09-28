import React from "react";

//components
import { MenuItem } from "./MenuItem";
import ItemsCategoryTitle from "../ItemsCategoryTitle";

//libraries
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//types
import { MenuItemType } from "./MenuItem";
import { Skeleton } from "@/components/ui/skeleton";
type CategoriesType = {
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

export default function MenuItemsWrapper() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/${"venhan"}/categories`
      );
      return data as CategoriesType[];
    },
  });

  if (isError) {
    const errorMessage = (error as Error).message;
    return <span>Error: {errorMessage}</span>;
  }

  return (
    <div className="flex w-full flex-col">
      {!isLoading ? (
        data.map(
          (category) =>
            category["items"].length > 0 && (
              <div key={category.id} id={`category-title-${category.id}`}>
                <ItemsCategoryTitle
                  id={category.id}
                  categoryIcon={category.icon.image}
                  categoryName={category.name}
                />
                <div className="relative grid w-full grid-cols-2 justify-between gap-2 p-2">
                  {category["items"].map((item) => (
                    <MenuItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      is_available={item.is_available}
                      price={item.price}
                      image={item.image}
                    ></MenuItem>
                  ))}
                </div>
              </div>
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

/* {!isLoading ? (
        <>
          {data.map((item: MenuItemType) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              is_available={item.is_available}
              price={item.price}
              image={item.image}
            ></MenuItem>
          ))}
        </>
      )  */
