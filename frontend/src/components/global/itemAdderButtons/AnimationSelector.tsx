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
import { _Translator } from "next-intl";

//utils
import { formToMenuGlobalStyling } from "@/app/[locale]/(creator)/builder/utils/formToMenuGlobalStyling";
import { generateStyleVars } from "@/app/[locale]/(menu)/[business_slug]/utilities/styleVars";

//types
import { type BuilderFormType } from "@/app/[locale]/(creator)/builder/components/builder/BuilderTest";

export default function AnimationSelector({
  defaultValue = [],
  value,
  onChange,
  t
}: {
  defaultValue?: AnimationOptionsType[];
  value?: AnimationOptionsType[];
  onChange?: (value: AnimationOptionsType[]) => void;
  t: _Translator<Record<string, any>, "builder.builder.sections.customization.steps.detail.options">
}) {
  const [internalValue, setInternalValue] =
    useState<AnimationOptionsType[]>(defaultValue);
  const isControlled = value !== undefined;
  const selected = isControlled ? value! : internalValue;

  const previewBtnRef = useRef<HTMLButtonElement>(null);
  const tactileBtnRef = useRef<HTMLButtonElement>(null);
  const rippleBtnRef = useRef<HTMLButtonElement>(null);

  const { watch } = useFormContext<BuilderFormType>();
  const data = watch();

  //separates and normalizes form data
  const { globalStyling, menu } = formToMenuGlobalStyling(data);

  //generate style variables
  const colors = [
    globalStyling.primary_color,
    globalStyling.secondary_color,
    globalStyling.tertiary_color,
    globalStyling.bg_color,
  ];
  const styleVars = generateStyleVars(colors, globalStyling.border_radius);

  //animation for option buttons(default animation for app's buttons)
  useTactileAnimation(rippleBtnRef, { scale: 0.02 });
  useTactileAnimation(tactileBtnRef, { scale: 0.02 });

  //initial animations mount
  const triggerRippleAnimation = useRippleAnimation(
    previewBtnRef,
    { duration: 1200, size: 100, color: globalStyling.primary_color },
    selected.includes("ripple")
  );
  const triggerTactileAnimation = useTactileAnimation(
    previewBtnRef,
    {},
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
        style={styleVars as React.CSSProperties}
        type="button"
        disabled={!selected.length}
        ref={previewBtnRef}
        className="scale-pro flex gap-2 border-2 rounded-(--radius-base) bg-(--tertiary) border-(--category-btn-text) text-(--category-btn-text) transition-[background-color,color,box-shadow,border-radius,border-color,opacity] duration-300"
      >
        <Sparkles className="h-5 w-5"></Sparkles>
        <p className="font-normal">{t('animation.exampleBtn')}</p>
      </Button>

      <section className="flex w-full gap-2">
        <Button
          ref={rippleBtnRef}
          onClick={() => toggle("ripple")}
          className={`scale-pro h-[52px] w-[52px] flex-1 gap-1 border-2 bg-sad-blue/80 px-4 text-base text-primary transition-[border-color,background-color] duration-300 ${selected.includes("ripple")
            ? "border-primary bg-primary text-primary-foreground hover:border-primary"
            : "border-transparent hover:border-primary/30"
            }`}
          type="button"
        >
          {selected.includes("ripple") && <Check className="h-6 w-6"></Check>}
          <p>{t('animation.types.ripple')}</p>
        </Button>
        <Button
          ref={tactileBtnRef}
          onClick={() => toggle("tactile")}
          className={`scale-pro h-[52px] w-[52px] flex-1 gap-1 border-2 bg-sad-blue/80 text-base text-primary transition-[border-color,background-color] duration-300 ${selected.includes("tactile")
            ? "border-primary bg-primary text-primary-foreground hover:border-primary"
            : "border-transparent hover:border-primary/30"
            }`}
          type="button"
        >
          {selected.includes("tactile") && <Check className="h-6 w-6"></Check>}
          <p>{t('animation.types.tactile')}</p>
        </Button>
      </section>
    </div>
  );
}
