"use client";

import React from "react";

//utils
import { cn } from "@/lib/utils";

//components
import Image from "next/image";
import { Label } from "@/components/ui/label";

//types
type SliderCardType = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

type SliderCardTitle = {
  title: string;
  iconSrc: string;
  children: React.ReactNode;
};

type SliderCardBody = {
  isOpen?: boolean;
  description?: string;
  children?: React.ReactNode;
};

export function SliderCard({ isActive, onClick, children }: SliderCardType) {
  return (
    <Label
      onClick={onClick}
      className={cn(
        `flex w-full cursor-pointer select-none flex-col justify-between gap-2 rounded-lg border-[3px] bg-soft-blue p-2 text-royal-green transition-all duration-200 ease-in-out sm:p-3 ${
          isActive ? "border-royal-green" : "border-sad-blue"
        }`
      )}
    >
      {children}
    </Label>
  );
}

export function SliderCardTitle({ title, iconSrc, children }: SliderCardTitle) {
  return (
    <div className="flex w-full cursor-pointer items-center justify-between">
      <div className="flex items-center justify-between gap-2">
        <div className="relative aspect-square w-6 sm:w-7">
          <Image src={iconSrc} fill={true} alt="card-icon"></Image>
        </div>
        <h3 className="text-lg font-bold sm:text-2xl">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function SliderCardBody({
  isOpen,
  description,
  children,
}: SliderCardBody) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-normal sm:text-base">{description}</p>
      <div className={`${isOpen ? "flex" : "hidden"}`}>{children}</div>
    </div>
  );
}
