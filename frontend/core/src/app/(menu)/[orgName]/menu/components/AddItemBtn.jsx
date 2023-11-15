import Image from "next/image";
import { useEffect, useState } from "react";
import { useItems, useItemsDispatch } from "./ItemsContext";

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
    <div className={`flex h-full w-20 sm:w-28 ${borderRadius}`}>
      {itemQuantity > 0 ? (
        <section
          className={`flex h-full w-full items-center ${borderRadius} bg-${secondaryColor} justify-between p-[2px] sm:p-1`}
        >
          <ValueChangerBtn
            borderRadius={borderRadius}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            name="decrease"
            iconSrc={
              itemQuantity > 1
                ? "/images/menu-items/svg/minus.svg"
                : "/images/menu-items/svg/trash.svg"
            }
            action={() => {
              itemQuantity > 1
                ? dispatch({
                    type: "decreased",
                    id: itemId,
                    count: itemQuantity,
                  })
                : dispatch({
                    type: "removed",
                    id: itemId,
                  });
            }}
          ></ValueChangerBtn>

          <span className="mt-[3px] flex-initial">
            <p className={`sm:text-xl text-${primaryColor}`}>{itemQuantity}</p>
          </span>

          <ValueChangerBtn
            borderRadius={borderRadius}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            name="increase"
            iconSrc={"/images/menu-items/svg/plus.svg"}
            action={() => {
              dispatch({
                type: "increased",
                id: itemId,
                count: itemQuantity,
              });
            }}
          ></ValueChangerBtn>
        </section>
      ) : (
        <button
          className={`flex h-full w-full flex-none items-center ${borderRadius} gap-2 bg-${secondaryColor} justify-center px-4 sm:gap-4`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: "added",
              id: itemId,
              count: 1,
            });
          }}
        >
          <p className=" flex-initial text-xs font-semibold sm:text-base">
            افزودن
          </p>
          <div className="relative h-4 w-4 flex-none justify-center sm:h-6 sm:w-6">
            <Image
              src={"/images/menu-items/svg/plus.svg"}
              alt="افزودن"
              style={{ objectFit: "cover" }}
              fill={true}
            ></Image>
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
      <Image
        style={{
          filter:
            "invert(87%) sepia(20%) saturate(653%) hue-rotate(144deg) brightness(92%) contrast(91%)",
        }}
        fill={true}
        src={iconSrc}
        alt={name}
      ></Image>
    </button>
  );
};
