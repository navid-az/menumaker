"use client";

import React from "react";

//components
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import AssetPicker, { AssetGroupType, type AssetType } from "../AssetPicker";

//SVGs
import { Plus } from "lucide-react";
import { useActionButton } from "@/lib/stores";

export function AssetPickerPopOver({
  assetGroups,
  ref,
}: {
  assetGroups: AssetGroupType[];
  ref?: React.RefObject<HTMLButtonElement | null>;
}) {
  const setValue = useActionButton((state) => state.setValue);
  const resetValue = useActionButton((state) => state.resetValue);
  const icon = useActionButton((state) => state.icon);
  const iconName = useActionButton((state) => state.name);

  const handleAssetPicker = (icon: AssetType) => {
    const item = {
      id: icon.id.toString(),
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
          <AssetPicker
            assetGroups={assetGroups}
            action={(selectedIcon: AssetType) => {
              handleAssetPicker(selectedIcon);
            }}
          ></AssetPicker>
        </div>
      </PopoverContent>
    </Popover>
  );
}
