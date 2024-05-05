import React, { useEffect, useReducer, useRef, useState } from "react";
import * as z from "zod";

// SVGs
import { Edit } from "@/app/components/svgs";
import { Trash } from "@/app/components/svgs";
import { Plus } from "@/app/components/svgs";

//components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Selector from "./selector";

enum ItemAdderActions {
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
}

//types
type ReducerAction = {
  type: ItemAdderActions;
  id: string;
  name?: string;
  icon?: string;
};

type ItemType = { id: string; name?: string; icon?: string };
type ItemsType = ItemType[];

const reducer = (items: ItemsType, action: ReducerAction) => {
  switch (action.type) {
    case ItemAdderActions.ADD_ITEM:
      return [
        ...items,
        {
          id: action.id,
          name: action.name,
          icon: action.icon,
        },
      ];
    case ItemAdderActions.EDIT_ITEM:
      return items.map((item) => {
        if (item.id === action.id) {
          return {
            id: action.id,
            name: action.name,
            icon: action.icon,
          };
        } else {
          return item;
        }
      });
    case ItemAdderActions.DELETE_ITEM:
      return items.filter((item) => item.id !== action.id);
    default:
      return items;
  }
};
let nextItemId = 0;

type ItemAdderType = {
  placeholder: string;
  name: string;
  initValue?: ItemsType;
};

const itemAdderInputSchema = z.string().max(50).nullable();

export default function ItemAdder({
  placeholder,
  //   valueCount = 2,
  name = "",
  initValue = [],
}: ItemAdderType) {
  const [items, dispatch] = useReducer(reducer, []);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [text, setText] = useState<string | undefined>("");
  const [icon, setIcon] = useState<string | undefined>("");
  const [inputError, setInputError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  const resetInputs = () => {
    setCurrentItem("");
    setText("");
    setIcon("");
    setEditMode(false);
  };

  const setInputs = (item: ItemType) => {
    setCurrentItem(item.id);
    setText(item.name);
    setIcon(item.icon);
    setEditMode(true);
  };

  const handleAddItem = () => {
    const isValid = itemAdderInputSchema.parse(text);
    resetInputs();

    if (isValid || icon) {
      dispatch({
        type: ItemAdderActions.ADD_ITEM,
        id: (nextItemId++).toString(),
        name: text,
        icon: icon,
      });
      setInputError("");
    } else {
      setInputError("هر بخش حداقل یک آیکون یا اسم نیاز دادر");
    }
  };

  const handleEditItem = () => {
    resetInputs();

    dispatch({
      type: ItemAdderActions.EDIT_ITEM,
      id: currentItem,
      name: text,
      icon: icon,
    });
  };
  const handleDeleteItem = (itemId: string) => {
    resetInputs();

    dispatch({
      type: ItemAdderActions.DELETE_ITEM,
      id: itemId,
    });
  };

  const editing = (item: ItemType) => {
    if (currentItem == item.id) {
      resetInputs();
    } else {
      setInputs(item);
    }
  };

  return (
    <div className="flex h-max w-full flex-col gap-2">
      <section className="flex flex-col items-end gap-2">
        <div className="flex h-max w-full flex-row items-center justify-between gap-2 rounded-lg bg-sad-blue p-2">
          <Input
            ref={inputRef}
            type="text"
            name={name}
            placeholder={placeholder}
            value={text}
            className="h-9 border-0 bg-sad-blue text-right"
            isFocused
            onChange={(e) => {
              setText(e.target.value);
              setInputError("");
            }}
          ></Input>
          <section className="flex gap-2 ">
            {/* icon selector popover */}
            <Popover>
              <PopoverTrigger>
                <Button
                  className="px-4 text-xs sm:text-sm"
                  size="sm"
                  type="button"
                >
                  آیکون
                </Button>
              </PopoverTrigger>
              <PopoverContent className="border-0 bg-primary p-0">
                <Selector
                  action={(selectedIcon: object) => {
                    setIcon(selectedIcon.pk);
                  }}
                ></Selector>
              </PopoverContent>
            </Popover>
            {editMode == true ? (
              <Button
                type="button"
                size="sm"
                className="text-xs sm:text-sm"
                onClick={handleEditItem}
              >
                ویرایش
              </Button>
            ) : (
              <Button
                disabled={!text && true}
                type="button"
                size="icon"
                className="h-9 w-9 transition-opacity duration-500"
                onClick={handleAddItem}
              >
                <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            )}
          </section>
        </div>
        {inputError && <p className="text-xs text-red-400">{inputError}</p>}
      </section>

      {/* items list */}
      {items.length != 0 && (
        <section className="flex flex-col gap-2 rounded-md bg-sad-blue p-1 sm:p-2">
          {/* <h3 className="w-full text-right font-semibold text-royal-green">
            لیست بخش ها
          </h3> */}
          {items.map((item) => (
            <ListItem
              item={item}
              handleEdit={() => editing(item)}
              handleDelete={() => handleDeleteItem(item.id)}
              isActive={item.id === currentItem}
            ></ListItem>
          ))}
        </section>
      )}
    </div>
  );
}

type ListItemType = {
  item: ItemType;
  handleEdit: () => void;
  handleDelete: () => void;
  isActive: boolean;
};

function ListItem({ item, handleEdit, handleDelete, isActive }: ListItemType) {
  return (
    <div key={item.id} className="flex items-center justify-between p-1">
      <section className="flex gap-2">
        <p className="text-sm sm:text-base">{item.icon}</p>
        <p className="text-sm sm:text-base">{item.name}</p>
      </section>
      <div className="flex gap-2">
        <Button
          size="icon"
          className={`h-8 w-8 text-royal-green ${
            isActive ? "bg-primary" : "bg-transparent"
          }`}
          onClick={() => handleEdit()}
        >
          <Edit
            className={`h-5 w-5 ${
              isActive ? "stroke-primary-foreground" : "bg-transparent"
            }`}
          />
        </Button>
        <Button
          size="icon"
          className="h-8 w-8 bg-transparent text-royal-green"
          onClick={() => handleDelete()}
        >
          <Trash className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
