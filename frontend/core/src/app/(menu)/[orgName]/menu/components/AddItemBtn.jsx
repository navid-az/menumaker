import { useEffect, useState } from "react";
import { useItems, useItemsDispatch } from "./ItemsContext";

//svg
import { Minus, Plus, ArrowLeft, Trash } from "@/app/components/svgs";
import Button from "@/app/components/Button";

export default function AddItemBtn({
  primaryColor,
  secondaryColor,
  type = "square",
  itemId,
}) {
  const [borderRadius, setBorderRadius] = useState("rounded-md");
  const { items, getItemQuantity } = useItems();
  const dispatch = useItemsDispatch();
  const itemQuantity = getItemQuantity(itemId);

  useEffect(() => {
    if (type == "circle") {
      setBorderRadius("rounded-full");
    } else if (type == "square") {
      setBorderRadius("rounded-md");
    }
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex h-full w-20 transition-all xss:w-24 ${borderRadius}`}
    >
      {itemQuantity > 0 ? (
        <section
          className={`flex h-full w-full items-center ${borderRadius} bg-${secondaryColor} justify-between p-[2px] sm:p-1`}
        >
          <ValueChangerBtn
            borderRadius={borderRadius}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            name="decrease"
            iconSrc={itemQuantity > 1 ? "minus" : "trash"}
            action={() => {
              itemQuantity > 1
                ? dispatch({
                    type: "decreased",
                    id: itemId,
                    quantity: itemQuantity,
                  })
                : dispatch({
                    type: "removed",
                    id: itemId,
                  });
            }}
          ></ValueChangerBtn>

          <span className="mt-[3px] flex-initial">
            <p className={`xs:text-xl text-${primaryColor}`}>{itemQuantity}</p>
          </span>

          <ValueChangerBtn
            borderRadius={borderRadius}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            name="increase"
            iconSrc={"plus"}
            action={() => {
              dispatch({
                type: "increased",
                id: itemId,
                quantity: itemQuantity,
              });
            }}
          ></ValueChangerBtn>
        </section>
      ) : (
        // <Button
        //   variant="square"
        //   primaryColor={primaryColor}
        //   secondaryColor={secondaryColor}
        //   onClick={(e) => {
        //     e.stopPropagation();
        //     dispatch({
        //       type: "added",
        //       id: itemId,
        //       quantity: 1,
        //     });
        //   }}
        // >
        //   <p className=" xs:text flex-initial pt-[0.5px] text-xs font-semibold xss:text-sm">
        //     افزودن
        //   </p>
        //   <div className="aspect-square h-full">
        //     <Plus
        //       className={`stroke-${primaryColor} h-full w-full stroke-[1.1] xss:stroke-[1.3]`}
        //     />
        //   </div>
        // </Button>
        <button
          className={`flex h-full w-full flex-none items-center ${borderRadius} gap-2 bg-${secondaryColor} justify-center px-2 py-1 sm:gap-4`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: "added",
              id: itemId,
              quantity: 1,
            });
          }}
        >
          <p className=" xs:text flex-initial pt-[0.5px] text-xs font-semibold xss:text-sm">
            افزودن
          </p>
          <div className="aspect-square h-full">
            <Plus
              className={`stroke-${primaryColor} h-full w-full stroke-[1.1] xss:stroke-[1.3]`}
            />
          </div>
        </button>
      )}
    </div>
  );
}

const ValueChangerBtn = ({
  name,
  iconSrc,
  action,
  primaryColor,
  secondaryColor,
  borderRadius,
}) => {
  return (
    <button
      name={name}
      onClick={(e) => {
        action();
        e.stopPropagation();
      }}
      className={`relative aspect-square h-full rounded-[4px] ${borderRadius} bg-${primaryColor}`}
    >
      {iconSrc == "minus" ? (
        <Minus className={`text-${secondaryColor} h-full w-full`} />
      ) : iconSrc == "trash" ? (
        <Trash className={`text-${secondaryColor} h-full w-full`} />
      ) : (
        <Plus className={`text-${secondaryColor} h-full w-full`} />
      )}
    </button>
  );
};
