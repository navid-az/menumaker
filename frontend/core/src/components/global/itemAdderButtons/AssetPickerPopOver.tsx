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

//hooks
import { useAssetPicker } from "@/lib/stores";

export function AssetPickerPopOver({
  assetGroups,
  ref,
}: {
  assetGroups: AssetGroupType[];
  ref?: React.RefObject<HTMLButtonElement | null>;
}) {
  //get access to global state
  const { asset, setAsset, resetAsset } = useAssetPicker();

  const [isOpen, setIsOpen] = useState(false);

  // Handler for when an asset is selected in AssetPicker
  const handleAssetSelect = (asset: AssetType) => {
    setIsOpen(false);
    setAsset(asset);
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
          {asset.image ? (
            <div className=" flex justify-between gap-3 [&>*]:transition-transform [&>*]:duration-200">
              {/* delete icon button */}
              <Button
                size="icon"
                asChild
                onClick={(e) => {
                  resetAsset();
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
                  alt={asset.name}
                  src={`http://127.0.0.1:8000/${asset.image}`}
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
            action={(selectedAsset: AssetType) => {
              handleAssetSelect(selectedAsset);
            }}
          ></AssetPicker>
        </div>
      </PopoverContent>
    </Popover>
  );
}
