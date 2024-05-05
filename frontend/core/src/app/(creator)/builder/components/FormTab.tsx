import React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type FormTabType = {
  isActive: boolean;
  children: React.ReactNode;
};

export default function FormTab({ isActive, children }: FormTabType) {
  return (
    <li
      className={cn(
        ` duration-2000 flex w-full cursor-pointer select-none flex-col justify-between gap-2 rounded-lg border-[3px] bg-soft-blue p-2 text-royal-green transition-all ease-in-out sm:p-3 ${
          isActive ? "border-royal-green" : "border-sad-blue"
        }`
      )}
    >
      {children}
    </li>
  );
}

type TabTitleType = {
  title: string;
  description?: string;
  icon: string;
  children: React.ReactNode;
};

export function FormTabTitle({
  title,
  description,
  icon,
  children,
}: TabTitleType) {
  return (
    <>
      <Label className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="relative aspect-square w-6 sm:w-7">
            <Image src={icon} fill={true} alt="section icon"></Image>
          </div>
          <h3 className="text-lg font-bold sm:text-2xl">{title}</h3>
        </div>
        {children}
      </Label>
      <p className="text-sm font-normal sm:text-base">{description}</p>
    </>
  );
}

type FormTabBodyType = { isOpen: boolean; children: React.ReactNode };

export function FormTabBody({ isOpen, children }: FormTabBodyType) {
  return (
    <div className={`${isOpen ? "flex" : "hidden"} w-full`}>{children}</div>
  );
}
