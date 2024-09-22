import React, { useRef, useReducer } from "react";

//SVGs
import { Minus, Plus, Trash } from "@/app/components/svgs";

//components
import { Button } from "@/components/ui/button";

//libraries
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

//hooks
import useConditionalAnimation from "@/app/hooks/useConditionalAnimation";

//types
type AddItemBtnType = {
  itemId: string;
  primaryColor: string;
  secondaryColor: string;
};
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    AddItemBtnType,
    VariantProps<typeof addItemBtnVariants> {}

type ItemType = {
  id: string;
  quantity: number;
};
type ItemsType = ItemType[];
type ReducerActionType = { type: ACTIONS; payload: { id: string } };

//component variants
const addItemBtnVariants = cva(`relative flex transition-all`, {
  variants: {
    size: {
      default: "h-10 p-1",
      sm: "h-9 rounded-md p-1",
      lg: "h-11 rounded-md p-1.5",
    },
    variant: {
      default: "",
      minimal: "",
      classic: "",
    },
    borderRadius: {
      default: "rounded-full",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
    borderRadius: "default",
  },
});

enum ACTIONS {
  ADDED,
  INCREASED,
  DECREASED,
  REMOVED,
}

//reducer function
const itemsReducer = (items: ItemsType, action: ReducerActionType) => {
  switch (action.type) {
    case ACTIONS.ADDED: {
      return [...items, { id: action.payload.id, quantity: 1 }];
    }
    case ACTIONS.INCREASED: {
      return items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity++ };
        } else {
          return item;
        }
      });
    }
    case ACTIONS.DECREASED: {
      return items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity-- };
        } else {
          return item;
        }
      });
    }
    case ACTIONS.REMOVED: {
      return items.filter((item) => item.id !== action.payload.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default function AddItemBtn({
  itemId,
  primaryColor,
  secondaryColor,
  size,
  borderRadius,
  variant,
  className,
}: ButtonProps) {
  const [items, dispatch] = useReducer(itemsReducer, []);
  const getItemQuantity = (id: string) => {
    return items.find((item: ItemType) => item.id === id)?.quantity || 0;
  };
  const itemQuantity = getItemQuantity(itemId);

  return (
    <div
      className={cn(
        addItemBtnVariants({ variant, size, borderRadius, className })
      )}
      style={{ background: secondaryColor }}
    >
      {itemQuantity > 0 ? (
        <section
          className={`flex h-full w-full items-center justify-between gap-2 rounded-full`}
        >
          <ValueChangerBtn
            name="increase"
            action={() => {
              dispatch({
                type: ACTIONS.INCREASED,
                payload: { id: itemId },
              });
            }}
            iconSrc="plus"
            borderRadius={borderRadius}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          ></ValueChangerBtn>

          <span className="mt-1 flex-initial basis-4/12 text-center text-lg">
            <p className="text-2xl" style={{ color: primaryColor }}>
              {itemQuantity}
            </p>
          </span>
          <ValueChangerBtn
            name="decrease"
            action={() => {
              itemQuantity > 1
                ? dispatch({
                    type: ACTIONS.DECREASED,
                    payload: { id: itemId },
                  })
                : dispatch({
                    type: ACTIONS.REMOVED,
                    payload: { id: itemId },
                  });
            }}
            iconSrc={itemQuantity != 1 ? "minus" : "trash"}
            borderRadius={borderRadius}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          ></ValueChangerBtn>
        </section>
      ) : (
        <Button
          className="h-full w-full rounded-full p-0"
          style={{
            background: secondaryColor,
            color: primaryColor,
          }}
          onClick={() => {
            dispatch({
              type: ACTIONS.ADDED,
              payload: { id: itemId },
            });
          }}
        >
          <Plus className="h-6 w-6 ltr:mr-2 rtl:ml-2" />
          <p className="text-lg">افزودن</p>
        </Button>
      )}
    </div>
  );
}

type ValueChangeBtnType = {
  name: string;
  iconSrc: string;
  action: () => void;
  borderRadius?: "default" | "lg" | "md" | "sm" | null;
  primaryColor: string;
  secondaryColor: string;
  className?: string;
};

const ValueChangerBtn = ({
  name,
  iconSrc,
  action,
  borderRadius,
  primaryColor,
  secondaryColor,
  className,
}: ValueChangeBtnType) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  useConditionalAnimation(btnRef, ["ripple", "tactile"]);
  return (
    <Button
      ref={btnRef}
      name={name}
      onClick={action}
      size="icon"
      className={cn(
        `h-full w-14 ${
          borderRadius === "lg"
            ? "rounded-lg"
            : borderRadius === "md"
            ? "rounded-md"
            : borderRadius === "sm"
            ? "rounded-sm"
            : "rounded-full"
        }`,
        className
      )}
      style={{
        background: primaryColor,
        color: secondaryColor,
      }}
    >
      {iconSrc == "minus" ? (
        <Minus className="h-full w-full" />
      ) : iconSrc == "trash" ? (
        <Trash className="h-full w-full" />
      ) : (
        <Plus className="h-full w-full" />
      )}
    </Button>
  );
};
