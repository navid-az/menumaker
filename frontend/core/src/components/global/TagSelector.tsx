"use client";

import React, { useState } from "react";

//SVGs
import { Check, CheckCheck } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

//types
export type Tag = { id: number; name: string };
type TagSelector = {
  data: Tag[];
  value?: Tag[];
  onChange?: (value: Tag[]) => void;
  defaultValues?: Tag[];
};

export default function TagSelector({
  data,
  value,
  onChange,
  defaultValues,
}: TagSelector) {
  const [state, setState] = useState(defaultValues || []);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : state;

  const handleSelect = (tag: Tag) => {
    const newState = currentValue.some((t) => t.id === tag.id)
      ? currentValue.filter((t) => t.id !== tag.id)
      : [...currentValue, tag];

    if (isControlled) {
      onChange?.(newState);
    } else {
      setState(newState);
    }
  };
  const updateState = (tag: Tag[]) => {
    if (!isControlled) {
      setState(tag);
    }
    onChange?.(tag);
  };

  const allToggled = currentValue.length === data.length;

  const toggleAll = () => {
    if (allToggled) {
      updateState([]);
    } else {
      updateState(data);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        onClick={toggleAll}
        className={cn(
          "rounded-full flex justify-between bg-primary-foreground text-primary border border-primary/5 hover:border-primary transition-all duration-300",
          allToggled && "bg-primary text-primary-foreground"
        )}
      >
        <p>همه</p>
        <CheckCheck className="h-5 w-5"></CheckCheck>
      </Button>
      {data.map((tag) => {
        const isSelected = currentValue.some((t) => t.id === tag.id);
        return (
          <Button
            type="button"
            onClick={() => handleSelect(tag)}
            key={tag.id}
            className={cn(
              "rounded-full flex justify-between bg-primary-foreground text-primary border border-primary/5 hover:border-primary transition-all duration-300",
              isSelected && "bg-primary text-primary-foreground"
            )}
          >
            <p>{tag.name}</p>
            <span
              className={`transition-all duration-200 
              ${isSelected ? "opacity-100 ml-0" : "opacity-0 -ml-7"}`}
            >
              <Check className="h-5 w-5" />
            </span>
          </Button>
        );
      })}
    </div>
  );
}
