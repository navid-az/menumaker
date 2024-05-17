import { useEffect, useRef, useState } from "react";
import { useItems, useItemsDispatch } from "./ItemsContext";

//SVGs
import { Minus, Plus, Trash } from "@/app/components/svgs";

//components
import { Button } from "@/components/ui/button";

//animation
import { useTactileAnimation } from "../../hooks/useTactileAnimation";

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
      onClick={(e) => {
        e.stopPropagation(e);
      }}
      className={`relative z-30 flex w-24 transition-all ${borderRadius}`}
    >
      {itemQuantity > 0 ? (
        <section
          className={`flex h-9 w-full items-center ${borderRadius} bg-${secondaryColor} justify-between gap-2 p-[3px]`}
        >
          <ValueChangerBtn
            name="decrease"
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
            iconSrc={itemQuantity != 1 ? "minus" : "trash"}
            secondaryColor={secondaryColor}
          ></ValueChangerBtn>

          <span className="mt-1 flex-initial text-lg">
            <p className={`xs:text-xl text-${primaryColor}`}>{itemQuantity}</p>
          </span>

          <ValueChangerBtn
            name="increase"
            action={() => {
              dispatch({
                type: "increased",
                id: itemId,
                quantity: itemQuantity,
              });
            }}
            iconSrc="plus"
            secondaryColor={secondaryColor}
          ></ValueChangerBtn>
        </section>
      ) : (
        <Button
          size="sm"
          className="w-full bg-sky-blue text-royal-green"
          onClick={() => {
            dispatch({
              type: "added",
              id: itemId,
              quantity: 1,
            });
          }}
        >
          افزودن <Plus className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

const ValueChangerBtn = ({ name, iconSrc, action, secondaryColor }) => {
  const btnRef = useRef();
  useTactileAnimation(btnRef, { duration: 0.15 });
  return (
    <Button
      ref={btnRef}
      name={name}
      onClick={action}
      size="icon"
      className="h-full w-[30px]"
    >
      {iconSrc == "minus" ? (
        <Minus className={`text-${secondaryColor} h-6 w-6`} />
      ) : iconSrc == "trash" ? (
        <Trash className={`text-${secondaryColor} h-6 w-6`} />
      ) : (
        <Plus className={`text-${secondaryColor} h-6 w-6`} />
      )}
    </Button>
  );
};
