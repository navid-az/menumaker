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
import { nanoid } from "nanoid";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//functions
import isRTL from "@/lib/isRtl";

//SVGs
import { Trash } from "@/app/components/svgs";
import { Plus } from "@/app/components/svgs";
import { Edit3, ImageOff } from "lucide-react";

//types
import { type AssetGroupType, type AssetType } from "./AssetPicker";
export type ItemType = { id: string; name?: string; asset?: AssetType };
type ItemAdderType = {
  placeholder: string;
  limit?: number;
  name?: string;
  defaultValue?: ItemType[];
  value?: ItemType[];
  onChange?: (value: ItemType[]) => void;
  assetGroups: AssetGroupType[];
};

type ItemAction =
  | { type: "ADD"; payload: ItemType }
  | { type: "UPDATE"; id: string; payload: Partial<ItemType> }
  | { type: "DELETE"; id: string };

const reducer = (items: ItemType[], action: ItemAction): ItemType[] => {
  switch (action.type) {
    case "ADD":
      return [...items, action.payload];
    case "UPDATE":
      return items.map((item) =>
        item.id === action.id ? { ...item, ...action.payload } : item
      );
    case "DELETE":
      return items.filter((item) => item.id !== action.id);
    default:
      return items;
  }
};

const textInputSchema = z.string().max(50).nullable();

export default function ItemAdder({
  placeholder,
  limit = 3,
  name = "",
  defaultValue = [],
  value,
  onChange,
  assetGroups,
}: ItemAdderType) {
  const [internalState, dispatch] = useReducer(reducer, defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalState;

  const [asset, setAsset] = useState<AssetType>();
  const [text, setText] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [currentItemIndex, setCurrentItemIndex] = useState("");

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
      } else if (currentValue.length >= limit) {
        setIsDisabled(true);
        setInputError(`حداکثر میتوان ${limit} آیتم ایجاد کرد`);
      } else {
        setIsDisabled(false);
        setInputError("");
      }
    } else {
      if (textInputRef.current?.value) {
        //autofocus on the name if there is nay
        textInputRef.current.focus();
      }
      setIsDisabled(false);
      setInputError("");
    }
  });

  //buttons animation
  useTactileAnimation(assetPickerRef);
  useTactileAnimation(addEditItemBtnRef);
  // useTactileAnimation(linkActionRef);

  //reset actionButton and text input value
  const resetInputs = () => {
    setCurrentItemIndex("");
    setText("");
    setEditMode(false);
    setAsset(undefined);
  };

  //set input values to the item which is being edited
  const setInputs = (item: ItemType) => {
    setCurrentItemIndex(item.id);
    if (item.name) {
      setText(item.name);
    }
    setAsset(item.asset);
    setEditMode(true);
  };

  const handleAddItem = () => {
    resetInputs();

    //validate text input
    const textIsValid = textInputSchema.parse(text);

    //should at least have an image/text
    if (textIsValid || asset) {
      if (!isControlled) {
        dispatch({
          type: "ADD",
          payload: { id: nanoid(), name: text, asset: asset },
        });
      }
      onChange?.([...value!, { id: nanoid(), name: text, asset: asset }]);
      //remove any error text
      setInputError("");
    }
  };

  const handleEditItem = () => {
    if (currentItemIndex === undefined) return;
    resetInputs();

    if (!isControlled) {
      dispatch({
        type: "UPDATE",
        id: currentItemIndex,
        payload: { name: text, asset: asset },
      });
    }
    onChange?.(
      value!.map((item) => {
        if (item.id === currentItemIndex) {
          return {
            id: currentItemIndex,
            name: text,
            asset: asset,
          };
        } else {
          return item;
        }
      })
    );
  };

  const handleDeleteItem = (itemId: string) => {
    resetInputs();

    if (!isControlled) {
      dispatch({
        type: "DELETE",
        id: itemId,
      });
    }
    onChange?.(value!.filter((item) => item.id !== itemId));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setDirection(isRTL(text));
    setInputError("");
  };

  const editing = (item: ItemType) => {
    if (currentItemIndex == item.id) {
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
            onChange={handleInputChange}
            dir={`${direction === "rtl" ? "rtl" : "ltr"}`}
            className={`h-9 border-0 bg-sad-blue focus-visible:ring-primary/50`}
            isFocused
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
              } h-9 transition-[opacity,width] duration-300`}
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
      {currentValue.length != 0 && (
        <section className="flex flex-col gap-2 rounded-md bg-sad-blue p-1 sm:p-2">
          {currentValue.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              handleEdit={() => editing(item)}
              handleDelete={() => handleDeleteItem(item.id)}
              isActive={item.id === currentItemIndex}
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
          {item.asset ? (
            <Image
              className="rounded-md"
              fill
              alt={item.asset.name}
              src={`http://127.0.0.1:8000/${item.asset.image}`}
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
          onClick={handleEdit}
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
