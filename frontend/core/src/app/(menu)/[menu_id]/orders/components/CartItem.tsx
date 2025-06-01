//components
import AddToCartBtn from "../../menu/components/AddToCartBtn";
import PriceTag from "../../menu/components/PriceTag";
import { MenuGlobalStyling } from "../../menu/page";

//types
import { type ValidItemType } from "../page";

type CartItemType = { globalStyling: MenuGlobalStyling } & ValidItemType;

export default function CartItem({ item, globalStyling }: CartItemType) {
  return (
    <div className="flex h-max w-full items-center justify-between gap-4">
      <div className="flex flex-col">
        <p className="font-normal">{item.name}</p>
        <PriceTag
          size="sm"
          price={item.price}
          unitDisplayType="default"
          removeZeroes={false}
        ></PriceTag>
      </div>
      <AddToCartBtn
        className="w-5/12"
        itemId={item.id}
        globalStyling={globalStyling}
      ></AddToCartBtn>
    </div>
  );
}
