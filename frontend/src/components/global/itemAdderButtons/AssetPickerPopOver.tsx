"use client";

import React, { useState } from "react";

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

//libraries
import { useTranslations } from "next-intl";

//types
import { AssetType, AssetGroupType } from "../AssetPicker";

export function AssetPickerPopOver({
  assetGroups,
  ref,
  value,
  onChange,
  btnTriggerSize = "default",
  kind
}: {
  assetGroups: AssetGroupType[];
  ref?: React.RefObject<HTMLButtonElement | null>;
  value?: AssetType | null;
  onChange?: (selectedItem: AssetType | undefined | null) => void;
  btnTriggerSize?: "default" | "sm" | "lg" | "icon";
  kind?: 'icon' | 'pattern'
}) {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations('assetPicker')

  const handleOnChange = (selectedAsset: AssetType) => {
    setIsOpen(false);
    onChange?.(selectedAsset);
  };

  const removeSelectedAsset = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    onChange?.(null);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          size={btnTriggerSize}
          className="px-4 text-xs sm:text-sm"
          type="button"
        >
          {value?.url ? (
            <div className="flex justify-between gap-3 ">
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
                  alt={value.name ?? 'asset'}
                  src={value.url}
                />
              </div>
            </div>
          ) : (
            <p>{t("tabs.icon")}</p>
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
            kind={kind}
            t={t}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
