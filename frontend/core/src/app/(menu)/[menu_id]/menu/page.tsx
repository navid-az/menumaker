import { Suspense } from "react";

//components
import MenuItemsWrapper from "./components/Items/MenuItemsWrapper";
import ItemsCategory from "./components/ItemsCategory";
import CartBtn from "./components/CartBtn";
import QueryClientWrapper from "./components/QueryClientWrapper";
import CategoryBtnSkeleton from "./components/categories/CategoryBtnSkeleton";

//types
import { type AnimationVariantType } from "@/components/global/InteractiveWrapper";
export type MenuGlobalStyling = {
  id: number;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  bg_color: string;
  unit_display_type: "comp" | "simp" | "engL" | "perL";
  click_animation: AnimationVariantType[];
  updated: string;
  created: string;
  menu: number;
};

// GET menu global stylings
export async function getGlobalStyling(menu_id: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/menu/${menu_id}/global-styling/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching data:", error);
  }
}

export default async function Page(
  props: {
    params: Promise<{ menu_id: string }>;
  }
) {
  const params = await props.params;
  const globalStyling = await getGlobalStyling(params.menu_id);

  return (
    <div className="container relative flex flex-col gap-2 p-0">
      <Suspense
        fallback={<CategoryBtnSkeleton globalStyling={globalStyling} />}
      >
        <ItemsCategory params={params}></ItemsCategory>
      </Suspense>
      <QueryClientWrapper>
        <MenuItemsWrapper
          params={params}
          globalStyling={globalStyling}
        ></MenuItemsWrapper>
        <CartBtn type="compact" globalStyling={globalStyling}></CartBtn>
      </QueryClientWrapper>
    </div>
  );
}
