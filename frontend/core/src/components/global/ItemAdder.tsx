"use client";

import React, { useEffect, useReducer, useRef, useState } from "react";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AssetPickerPopOver } from "./itemAdderButtons/AssetPickerPopOver";
import { LinkAction } from "./itemAdderButtons/LinkAction";

//libraries
import * as z from "zod";
import { useFormContext } from "react-hook-form";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";
import { useAssetPicker } from "@/lib/stores";

//functions
import isRTL from "@/lib/isRtl";

// SVGs
import { Trash } from "@/app/components/svgs";
import { Plus } from "@/app/components/svgs";
import { Edit3, ImageOff } from "lucide-react";

//types
import { type AssetGroupType, type AssetType } from "./AssetPicker";
export type ItemType = { id: number; name?: string; image?: string };
type ItemsType = ItemType[];
type ReducerActionType = ItemType & { type: ItemAdderActions };
type ItemAdderType = {
  placeholder: string;
  limit?: number;
  name?: string;
  initValue?: ItemsType;
  assetGroups: AssetGroupType[];
};

//reducer actions
enum ItemAdderActions {
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
}

const reducer = (items: ItemsType, action: ReducerActionType) => {
  switch (action.type) {
    case ItemAdderActions.ADD_ITEM:
      return [
        ...items,
        {
          id: action.id,
          name: action.name,
          image: action.image,
        },
      ];
    case ItemAdderActions.EDIT_ITEM:
      return items.map((item) => {
        if (item.id === action.id) {
          return {
            id: action.id,
            name: action.name,
            image: action.image,
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

const textInputSchema = z.string().max(50).nullable();

export default function ItemAdder({
  placeholder,
  limit = 3,
  name = "",
  initValue = [],
  assetGroups,
}: ItemAdderType) {
  const [items, dispatch] = useReducer(reducer, []);

  const [asset, setAsset] = useState<AssetType>();
  const [text, setText] = useState("");

  //get access to parent's form methods/data
  // const form = useFormContext();

  const [isDisabled, setIsDisabled] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [currentItem, setCurrentItem] = useState<number | undefined>(undefined);

  // const { resetAsset } = useAssetPicker();

  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");
  const [inputError, setInputError] = useState("");

  const assetPickerRef = useRef<HTMLButtonElement>(null);
  // const linkActionRef = useRef<HTMLButtonElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const addEditItemBtnRef = useRef<HTMLButtonElement>(null);

  //enable/disable add button according to input values
  useEffect(() => {
    if (!editMode) {
      if (!text && !asset) {
        setIsDisabled(true);
        setInputError("");
      } else if (items.length >= limit) {
        setInputError(`حداکثر میتوان ${limit} آیتم ایجاد کرد`);
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
        setInputError("");
      }
    } else {
      if (textInputRef.current?.value) {
        textInputRef.current.focus();
      }
      setIsDisabled(false);
      setInputError("");
    }
  });

  //add ItemAdders data to the parent form
  // useEffect(() => {
  //   form.setValue(name, items);
  // }, [items]);

  //buttons animation
  useTactileAnimation(assetPickerRef);
  // useTactileAnimation(linkActionRef);
  useTactileAnimation(addEditItemBtnRef);

  //reset actionButton and text input value
  const resetInputs = () => {
    setCurrentItem(undefined);
    setText("");
    setEditMode(false);
    setAsset(undefined);
  };

  //set input values to the item which is being edited
  const setInputs = (item: ItemType) => {
    setCurrentItem(item.id);
    if (item.name) {
      setText(item.name);
    }
    setAsset(item as AssetType);
    setEditMode(true);
  };

  const handleAddItem = () => {
    resetInputs();

    //validate text input
    const textIsValid = textInputSchema.parse(text);

    //should at least have an image/text
    if (textIsValid || asset) {
      dispatch({
        type: ItemAdderActions.ADD_ITEM,
        id: nextItemId++,
        name: text,
        image: asset?.image,
      });
      //remove any error text
      setInputError("");
    }
  };

  const handleEditItem = () => {
    if (currentItem === undefined) return;
    resetInputs();
    dispatch({
      type: ItemAdderActions.EDIT_ITEM,
      id: currentItem,
      name: text,
      image: asset?.image,
    });
  };

  const handleDeleteItem = (itemId: number) => {
    resetInputs();

    dispatch({
      type: ItemAdderActions.DELETE_ITEM,
      id: itemId,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setDirection(isRTL(text));
    setInputError("");
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
      <section className="flex flex-col gap-2">
        <div className="flex h-max w-full flex-row items-center justify-between gap-2 rounded-lg bg-sad-blue p-2">
          <Input
            ref={textInputRef}
            type="text"
            name={name + "-text-input"}
            placeholder={placeholder}
            value={text}
            dir={`${direction === "rtl" ? "rtl" : "ltr"}`}
            className={`h-9 border-0 bg-sad-blue focus-visible:ring-primary/50`}
            isFocused
            onChange={handleInputChange}
          ></Input>
          <section className="flex gap-2">
            {/* ~~~~action buttons~~~~ */}
            <AssetPickerPopOver
              ref={assetPickerRef}
              value={asset}
              onChange={setAsset}
              assetGroups={assetGroups}
              btnTriggerSize="sm"
            ></AssetPickerPopOver>
            {/* <LinkAction ref={linkActionRef} text={text}></LinkAction> */}
            {/* ~~~~action buttons~~~~  */}
            <Button
              ref={addEditItemBtnRef}
              disabled={isDisabled}
              type="button"
              size="icon"
              className={`${
                editMode ? "w-16" : "w-9"
              } h-9 transition-opacity duration-300`}
              onClick={editMode ? handleEditItem : handleAddItem}
            >
              {editMode ? (
                <p>ویرایش</p>
              ) : (
                <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </Button>
          </section>
        </div>
        {inputError && <p className="text-xs text-red-400">{inputError}</p>}
      </section>
      {/* items list */}
      {items.length != 0 && (
        <section className="flex flex-col gap-2 rounded-md bg-sad-blue p-1 sm:p-2">
          {items.map((item) => (
            <ListItem
              key={item.id}
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
    <div
      key={item.id}
      className="flex cursor-default items-center justify-between p-1"
    >
      <section className="flex !items-center gap-2">
        <div className="relative h-8 w-8 rounded-md">
          {item.image ? (
            <Image
              className="rounded-md"
              fill
              alt={item.name!}
              src={`http://127.0.0.1:8000/${item.image}`}
            ></Image>
          ) : (
            <ImageOff
              className="text-primary"
              strokeWidth="1.5px"
              width={32}
              height={32}
            ></ImageOff>
          )}
        </div>
        <p className="text-sm sm:text-base">{item.name}</p>
      </section>
      {/* items edit & delete buttons  */}
      <div className="flex gap-2">
        <Button
          size="icon"
          type="button"
          className={`h-8 w-8 text-royal-green transition-transform duration-300 hover:scale-125 ${
            isActive ? "bg-primary hover:scale-95" : "bg-inherit"
          }`}
          onClick={() => handleEdit()}
        >
          <Edit3
            className={`h-5 w-5 ${
              isActive ? "stroke-primary-foreground" : "bg-transparent"
            }`}
          />
        </Button>
        <Button
          size="icon"
          type="button"
          className="h-8 w-8 bg-transparent text-royal-green transition-transform duration-300 hover:scale-125"
          onClick={() => handleDelete()}
        >
          <Trash className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
