"use client";

import React, { useEffect, useRef, useState } from "react";

//Components
import { Button } from "@/components/ui/button";

//Hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation"; //animation hook
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation"; //animation hook

//Types
type AnimationOptionsType = "ripple" | "tactile";

//SVGs
import { Check, Sparkles } from "lucide-react";

//libraries
import { useFormContext } from "react-hook-form";

export default function AnimationSelector({
  defaultValue = [],
  value,
  onChange,
}: {
  defaultValue?: AnimationOptionsType[];
  value?: AnimationOptionsType[];
  onChange?: (value: AnimationOptionsType[]) => void;
}) {
  const [internalValue, setInternalValue] =
    useState<AnimationOptionsType[]>(defaultValue);
  const isControlled = value !== undefined;
  const selected = isControlled ? value! : internalValue;

  const previewBtnRef = useRef<HTMLButtonElement>(null);
  const tactileBtnRef = useRef<HTMLButtonElement>(null);
  const rippleBtnRef = useRef<HTMLButtonElement>(null);

  const { watch } = useFormContext();

  //match preview button with the selected theme
  const theme = watch("global_styling.color_palette");

  //animation for option buttons(default animation for app's buttons)
  useTactileAnimation(rippleBtnRef, { scale: 0.02 });
  useTactileAnimation(tactileBtnRef, { scale: 0.02 });

  //initial animations mount
  const triggerRippleAnimation = useRippleAnimation(
    previewBtnRef,
    {},
    selected.includes("ripple")
  );
  const triggerTactileAnimation = useTactileAnimation(
    previewBtnRef,
    { scale: 0.04 },
    selected.includes("tactile")
  );

  const toggle = (option: AnimationOptionsType) => {
    const exists = selected.includes(option);
    const newValue = exists
      ? selected.filter((val) => val !== option)
      : [...selected, option];

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    console.log(newValue);
  };

  //trigger selected animations
  useEffect(() => {
    if (selected.includes("ripple")) {
      triggerRippleAnimation();
    }
    if (selected.includes("tactile")) {
      triggerTactileAnimation();
    }
  }, [selected]);

  return (
    <div className="flex h-max w-full flex-col items-end gap-4 rounded-md">
      <Button
        type="button"
        disabled={!selected.length}
        ref={previewBtnRef}
        className="scale-pro flex gap-2 border-2 shadow-sm transition-opacity duration-300"
        style={{
          backgroundColor: theme ? theme[1] : "pink",
          color: theme ? theme[0] : "brown",
          borderColor: theme ? theme[0] : "pink",
        }}
      >
        <Sparkles className="h-5 w-5"></Sparkles>
        <p className="font-normal">نمونه افکت</p>
      </Button>

      <section className="flex w-full gap-2">
        <Button
          ref={rippleBtnRef}
          onClick={() => toggle("ripple")}
          className={`scale-pro h-[52px] w-[52px] flex-1 gap-1 border-2 bg-sad-blue/80 px-4 text-base text-primary transition-[border-color,background-color] duration-300 ${
            selected.includes("ripple")
              ? "border-primary bg-primary text-primary-foreground hover:border-primary"
              : "border-transparent hover:border-primary/30"
          }`}
          type="button"
        >
          {selected.includes("ripple") && <Check className="h-6 w-6"></Check>}
          <p>ریپل</p>
        </Button>
        <Button
          ref={tactileBtnRef}
          onClick={() => toggle("tactile")}
          className={`scale-pro h-[52px] w-[52px] flex-1 gap-1 border-2 bg-sad-blue/80 text-base text-primary transition-[border-color,background-color] duration-300 ${
            selected.includes("tactile")
              ? "border-primary bg-primary text-primary-foreground hover:border-primary"
              : "border-transparent hover:border-primary/30"
          }`}
          type="button"
        >
          {selected.includes("tactile") && <Check className="h-6 w-6"></Check>}
          <p>تکتایل</p>
        </Button>
      </section>
    </div>
  );
}
