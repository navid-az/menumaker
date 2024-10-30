import { Suspense } from "react";

//components
import MenuItemsWrapper from "./components/Items/MenuItemsWrapper";
import ItemsCategory from "./components/ItemsCategory";
import CartBtn from "./components/CartBtn";
import QueryClientWrapper from "./components/QueryClientWrapper";

export default function Page({ params }: { params: { menu_id: string } }) {
  return (
    <div className="container relative flex flex-col gap-2 p-0">
      <Suspense fallback="loading categories...">
        <ItemsCategory params={params}></ItemsCategory>
      </Suspense>
      <QueryClientWrapper>
        <MenuItemsWrapper params={params}></MenuItemsWrapper>
        <CartBtn type="compact"></CartBtn>
      </QueryClientWrapper>
    </div>
  );
}
