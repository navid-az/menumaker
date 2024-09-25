import React from "react";

//components
import { MenuItem } from "./MenuItem";

//libraries
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//types
import { MenuItemType } from "./MenuItem";
import { Skeleton } from "@/components/ui/skeleton";

export default function MenuItemsWrapper() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/${"venhan"}/items`
      );
      return data as MenuItemType[];
    },
  });

  if (isError) {
    const errorMessage = (error as Error).message;
    return <span>Error: {errorMessage}</span>;
  }

  return (
    <div className="grid w-full grid-cols-2 justify-between gap-2 px-2 xss:gap-3 xss:px-3">
      {!isLoading ? (
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
