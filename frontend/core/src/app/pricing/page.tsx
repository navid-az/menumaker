"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import ItemsCategory from "../(menu)/[menu_id]/menu/components/ItemsCategory";
import PriceTag from "../(menu)/[menu_id]/menu/components/PriceTag";
import MenuItemsWrapper from "../(menu)/[menu_id]/menu/components/MenuItem";

const queryClient = new QueryClient();

export default function Pricing() {
  let type = "vertical";
  let params = { menu_id: 1 };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={"flex h-[2000px] w-full flex-col gap-4"}>
        <PriceTag price={40000} unitDisplayType="compact"></PriceTag>
        <ItemsCategory isSticky params={params}></ItemsCategory>
      </div>
    </QueryClientProvider>
  );
}
