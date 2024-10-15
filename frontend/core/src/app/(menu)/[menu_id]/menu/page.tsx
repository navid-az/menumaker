"use client";

//components
import MenuItemsWrapper from "./components/Items/MenuItemsWrapper";
import ItemsCategory from "./components/ItemsCategory";
import CartBtn from "./components/CartBtn";

type MenuType = {
  params: { menu_id: string };
};

export default function MenuPage({ params }: MenuType) {
  return (
    <div className="container relative flex flex-col gap-2 p-0">
      <ItemsCategory params={params}></ItemsCategory>
      <MenuItemsWrapper></MenuItemsWrapper>
      <CartBtn type="compact"></CartBtn>
    </div>
  );
}
