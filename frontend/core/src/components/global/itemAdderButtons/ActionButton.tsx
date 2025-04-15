"use client";

//components
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
//need fixing
import Selector from "@/components/global/itemAdderButtons/Selector";

//types
import { type SelectorItemType } from "@/components/global/itemAdderButtons/Selector";

//SVGs
import { Plus } from "lucide-react";
import { useActionButton } from "@/lib/stores";
import React from "react";

export function SelectorAction({
  ref,
}: {
  ref: React.RefObject<HTMLButtonElement>;
}) {
  const setValue = useActionButton((state) => state.setValue);
  const resetValue = useActionButton((state) => state.resetValue);
  const icon = useActionButton((state) => state.icon);
  const iconName = useActionButton((state) => state.name);

  const handleSelector = (icon: SelectorItemType) => {
    const item = {
      id: icon.pk.toString(),
      icon: icon.image,
      name: icon.name,
    };
    setValue(item);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          size="sm"
          className="px-4 text-xs sm:text-sm"
          type="button"
        >
          {icon ? (
            <div className=" flex justify-between gap-3 [&>*]:transition-transform [&>*]:duration-200">
              {/* delete icon button */}
              <Button
                size="icon"
                asChild
                onClick={() => {
                  resetValue();
                }}
                className="scale-pro hover:scale-110"
              >
                <Plus className="h-5 w-5 rotate-45 sm:h-6 sm:w-6" />
              </Button>
              <div className="scale-pro relative h-5 w-5 rounded-md hover:scale-110 sm:h-6 sm:w-6">
                <Image
                  className="rounded-md"
                  fill
                  alt={iconName}
                  src={`http://127.0.0.1:8000/${icon}`}
                ></Image>
              </div>
            </div>
          ) : (
            "آیکون"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild className="pointer-events-auto">
        <div className="flex h-full flex-col rounded-xl border-2 border-primary bg-soft-blue !p-3">
          <Selector
            action={(selectedIcon: SelectorItemType) => {
              handleSelector(selectedIcon);
            }}
          ></Selector>
        </div>
      </PopoverContent>
    </Popover>
  );
}
