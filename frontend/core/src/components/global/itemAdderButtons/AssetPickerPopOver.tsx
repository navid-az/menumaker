"use client";

import React, { useState } from "react";

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
  const asset = useActionButton((state) => state.icon);
  const assetName = useActionButton((state) => state.name);

  const [isOpen, setIsOpen] = useState(false);

  // Handler for when an asset is selected in AssetPicker
  const handleAssetSelect = (icon: AssetType) => {
    const item = {
      id: icon.id.toString(),
      name: icon.name,
      image: icon.image,
    };
    setValue(item);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          size="sm"
          className="px-4 text-xs sm:text-sm"
          type="button"
        >
          {asset ? (
            <div className=" flex justify-between gap-3 [&>*]:transition-transform [&>*]:duration-200">
              {/* delete icon button */}
              <Button
                size="icon"
                asChild
                onClick={(e) => {
                  resetValue();
                  e.stopPropagation();
                }}
                className="scale-pro hover:scale-110"
              >
                <Plus className="h-5 w-5 rotate-45 sm:h-6 sm:w-6" />
              </Button>
              <div className="scale-pro relative h-5 w-5 rounded-md hover:scale-110 sm:h-6 sm:w-6">
                <Image
                  className="rounded-md"
                  fill
                  alt={assetName}
                  src={`http://127.0.0.1:8000/${asset}`}
                ></Image>
              </div>
            </div>
          ) : (
            "آیکون"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild className="pointer-events-auto p-3">
        <div className="flex h-full flex-col rounded-xl border-2 border-primary bg-soft-blue">
          <AssetPicker
            assetGroups={assetGroups}
            action={(selectedIcon: AssetType) => {
              handleAssetSelect(selectedIcon);
            }}
          ></AssetPicker>
        </div>
      </PopoverContent>
    </Popover>
  );
}
