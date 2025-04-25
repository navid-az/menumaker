"use client";

import React, { useState, useEffect } from "react";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import AssetPicker from "../AssetPicker";

//SVGs
import { Plus } from "lucide-react";

//types
import { AssetType, AssetGroupType } from "../AssetPicker";

export function AssetPickerPopOver({
  assetGroups,
  ref,
  value,
  onChange,
}: {
  assetGroups: AssetGroupType[];
  ref?: React.RefObject<HTMLButtonElement | null>;
  value?: AssetType;
  onChange?: (selectedItem: AssetType | undefined) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [asset, setAsset] = useState<AssetType | undefined>(value);

  useEffect(() => {
    setAsset(value);
  }, [value]);

  const handleOnChange = (selectedAsset: AssetType) => {
    setAsset(selectedAsset);
    setIsOpen(false);
    onChange?.(selectedAsset);
  };

  const removeSelectedAsset = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setAsset(undefined);
    onChange?.(undefined);
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
            <div className="flex justify-between gap-3 [&>*]:transition-transform [&>*]:duration-200">
              <Button
                size="icon"
                asChild
                onClick={(e) => {
                  removeSelectedAsset(e);
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
                />
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
            value={value}
            onChange={(selectedAsset) => {
              handleOnChange(selectedAsset);
            }}
            assetGroups={assetGroups}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
