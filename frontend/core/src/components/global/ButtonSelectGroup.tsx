"use client";

import React, { createContext, useContext, useState, useRef } from "react";

//components
import { Button } from "@/components/ui/button";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//types
type ButtonSelectGroupProps = {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};
type ButtonSelectProps = {
  children: React.ReactNode;
  title?: string;
  value: string;
  disabled?: boolean;
};
type ButtonSelectContextType = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const ButtonSelectContext = createContext<ButtonSelectContextType | undefined>(
  undefined
);

export function ButtonSelectGroup({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
}: ButtonSelectGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (!isControlled) setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <ButtonSelectContext.Provider
      value={{ value: currentValue, onValueChange: handleChange }}
    >
      <div
        className={`flex w-full flex-wrap justify-start gap-2 rounded-md ${className || ""}`}
      >
        {children}
      </div>
    </ButtonSelectContext.Provider>
  );
}

export function ButtonSelect({
  children,
  title,
  value,
  disabled,
}: ButtonSelectProps) {
  const BtnRef = useRef<HTMLButtonElement | null>(null);
  const context = useContext(ButtonSelectContext);
  const isSelected = context?.value === value;
  useTactileAnimation(BtnRef);

  return (
    <Button
      ref={BtnRef}
      size="icon"
      type="button"
      disabled={disabled}
      onClick={() => context?.onValueChange?.(value)}
      className={`scale-pro cursor-pointer h-[52px] w-[52px] border-2 bg-sad-blue/80 transition-[border-color] duration-300
        ${
          isSelected
            ? "border-primary hover:border-primary"
            : "border-transparent hover:border-primary/30"
        }`}
    >
      {children}
      {title && <span className="sr-only">{title}</span>}
    </Button>
  );
}
