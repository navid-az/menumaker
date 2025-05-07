import React, { useRef, useState } from "react";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";

//animation hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

export type GlobalBorderRadiusType = "full" | "lg" | "md" | "sm";

type RadiusSelectorProps = {
  defaultValue?: GlobalBorderRadiusType;
  value?: GlobalBorderRadiusType;
  onChange?: (value: GlobalBorderRadiusType) => void;
};

type RadiusSelectorBtnType = {
  radius: GlobalBorderRadiusType;
  isSelected: boolean;
  onClick: (value: GlobalBorderRadiusType) => void;
};

export default function RadiusSelector({
  defaultValue = "full",
  value,
  onChange,
}: RadiusSelectorProps) {
  const [internalValue, setInternalValue] =
    useState<GlobalBorderRadiusType>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (newValue: GlobalBorderRadiusType) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const borderRadiuses: GlobalBorderRadiusType[] = ["full", "lg", "md", "sm"];

  return (
    <div className="flex h-max w-full justify-end gap-2 rounded-md">
      {borderRadiuses.map((radius) => (
        <RadiusSelectorBtn
          key={radius}
          radius={radius}
          isSelected={currentValue === radius}
          onClick={handleChange}
        />
      ))}
    </div>
  );
}

function RadiusSelectorBtn({
  radius,
  isSelected,
  onClick,
}: RadiusSelectorBtnType) {
  const BtnRef = useRef(null);
  useTactileAnimation(BtnRef);

  return (
    <Button
      size="icon"
      ref={BtnRef}
      onClick={() => onClick(radius)}
      className={`scale-pro h-[52px] w-[52px] border-2 bg-sad-blue/80 transition-[border-color] duration-300
        ${
          isSelected
            ? "border-primary hover:border-primary"
            : "border-transparent hover:border-primary/30"
        }`}
      type="button"
    >
      <Image
        width={24}
        height={24}
        alt={`radius-${radius}`}
        src={`/images/form-icons/radius-${radius}.svg`}
      />
    </Button>
  );
}
