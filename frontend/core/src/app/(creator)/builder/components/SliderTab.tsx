"use client";

import React from "react";

//utils
import { cn } from "@/lib/utils";

//components
import Image from "next/image";
import { Label } from "@/components/ui/label";

//types
type SliderTabType = {
  isActive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

type SliderTabTitle = {
  title: string;
  description?: string;
  iconSrc: string;
  children?: React.ReactNode;
};

type SliderTabBody = {
  isOpen?: boolean;
  children?: React.ReactNode;
};

export function SliderTab({ isActive, onClick, children }: SliderTabType) {
  return (
    <div
      onClick={onClick}
      className={cn(
        `flex w-full cursor-pointer select-none flex-col justify-between rounded-lg border-[3px] bg-soft-blue text-royal-green transition-all duration-200 ease-in-out ${
          isActive ? "border-royal-green" : "border-sad-blue"
        }`
      )}
    >
      {children}
    </div>
  );
}

export function SliderTabTitle({
  title,
  description,
  iconSrc,
  children,
}: SliderTabTitle) {
  return (
    <Label
      className={`flex w-full ${
        children ? "cursor-pointer" : "cursor-auto"
      } flex-col justify-between p-2 sm:p-3`}
    >
      <div className="flex justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="relative aspect-square w-6 sm:w-7">
            <Image src={iconSrc} fill={true} alt="card-icon"></Image>
          </div>
          <h3 className="text-lg font-bold sm:text-2xl">{title}</h3>
        </div>
        {children}
      </div>
      <p className="text-sm font-normal sm:text-base">{description}</p>
    </Label>
  );
}

export function SliderTabBody({ isOpen, children }: SliderTabBody) {
  const handleBodyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleBodyClick}
      className={`${isOpen ? "flex" : "hidden"} p-2 pt-0 sm:p-3 sm:pt-0`}
    >
      {children}
    </div>
  );
}
