//components
import AddToCartBtn from "../../menu/components/AddToCartBtn";
import PriceTag from "../../menu/components/PriceTag";

//types
import { type ValidItemType } from "../page";

export default function CartItem({ item }: ValidItemType) {
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
        primaryColor="#fbcfe8"
        secondaryColor="#172554"
        itemId={item.id}
      ></AddToCartBtn>
    </div>
  );
}
