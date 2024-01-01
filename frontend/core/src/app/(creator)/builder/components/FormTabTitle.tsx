import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React from "react";
import Image from "next/image";

type TabTitleType = {
  title: string;
  icon: string;
  switchId: string;
  children: React.ReactNode;
};

export default function FormTabTitle({
  title,
  icon,
  switchId,
  children,
}: TabTitleType) {
  return (
    <Label
      htmlFor={`switch-${switchId}`}
      className="flex w-full items-center justify-between"
    >
      {children}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold sm:text-2xl">{title}</h3>
        <div className="relative aspect-square w-6 sm:w-7">
          <Image src={icon} fill={true} alt="section icon"></Image>
        </div>
      </div>
    </Label>
  );
}
