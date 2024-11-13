//components
import AddToCartBtn from "../../menu/components/AddToCartBtn";
import PriceTag from "../../menu/components/PriceTag";
import { MenuGlobalStyling } from "../../menu/page";

//types
import { type ValidItemType } from "../page";

type CartItemType = { globalStyling: MenuGlobalStyling } & ValidItemType;

export default function CartItem({ item, globalStyling }: CartItemType) {
  return (
    <div className="flex h-max w-full items-center justify-between">
      <div className="flex basis-9/12 flex-col">
        <p className="font-normal">{item.name}</p>
        <PriceTag
          size="sm"
          price={item.price}
          unitDisplayType="default"
          removeZeroes={false}
        ></PriceTag>
      </div>
      <AddToCartBtn
        size="sm"
        primaryColor={globalStyling.primary_color}
        secondaryColor={globalStyling.secondary_color}
        itemId={item.id}
        animations={globalStyling.click_animation}
      ></AddToCartBtn>
    </div>
  );
}
