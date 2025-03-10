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

export default function AnimationSelector() {
  const [selectedAnimations, setSelectedAnimations] = useState<
    AnimationOptionsType[]
  >([]);

  const previewBtnRef = useRef<HTMLButtonElement>(null);

  const tactileBtnRef = useRef<HTMLButtonElement>(null);
  const rippleBtnRef = useRef<HTMLButtonElement>(null);
  const rippleTactileBtnRef = useRef<HTMLButtonElement>(null);
  const noneBtnRef = useRef<HTMLButtonElement>(null);

  const { watch, setValue } = useFormContext();
  const colors = watch("global_styling.color_palette");

  //animation for option buttons(default animation for app's buttons)
  useTactileAnimation(rippleBtnRef, { scale: 0.02 });
  useTactileAnimation(tactileBtnRef, { scale: 0.02 });
  useTactileAnimation(rippleTactileBtnRef, { scale: 0.02 });
  useTactileAnimation(noneBtnRef, { scale: 0.04 });

  //initial animations mount
  const triggerRippleAnimation = useRippleAnimation(
    previewBtnRef,
    {},
    selectedAnimations.includes("ripple")
  );
  const triggerTactileAnimation = useTactileAnimation(
    previewBtnRef,
    { scale: 0.04 },
    selectedAnimations.includes("tactile")
  );

  //handle animation options button click
  const handleBtnClick = (
    e: React.MouseEvent,
    animationType: AnimationOptionsType | ""
  ) => {
    e.preventDefault();

    if (animationType) {
      if (selectedAnimations.includes(animationType)) {
        setSelectedAnimations((prev) =>
          prev.filter((item) => item !== animationType)
        );
      } else {
        setSelectedAnimations((prev) => [...prev, animationType]);
      }
    } else if (animationType.length == 0) {
      setSelectedAnimations([]);
    }
  };

  //Trigger selected animations & update click_animation_type accordingly
  useEffect(() => {
    if (selectedAnimations.includes("ripple")) {
      triggerRippleAnimation();
    }
    if (selectedAnimations.includes("tactile")) {
      triggerTactileAnimation();
    }
    setValue("global_styling.click_animation_type", selectedAnimations);
  }, [selectedAnimations]);

  return (
    <div className="flex h-max w-full flex-col items-end gap-4 rounded-md">
      <Button
        type="button"
        disabled={!selectedAnimations.length}
        ref={previewBtnRef}
        className="scale-pro flex gap-2 border-2 shadow-sm transition-opacity duration-300"
        style={{
          backgroundColor: colors ? colors[1] : "pink",
          color: colors ? colors[0] : "brown",
          borderColor: colors ? colors[0] : "pink",
        }}
      >
        <Sparkles className="h-5 w-5"></Sparkles>
        <p className="font-normal">نمونه افکت</p>
      </Button>
      <section className="flex w-full gap-2">
        <Button
          ref={rippleBtnRef}
          onClick={(e) => handleBtnClick(e, "ripple")}
          className={`scale-pro h-[52px] w-[52px] flex-1 gap-1 border-2 bg-sad-blue/80 px-4 text-base text-primary transition-[border-color,background-color] duration-300 ${
            selectedAnimations.includes("ripple")
              ? "border-primary bg-primary text-primary-foreground hover:border-primary"
              : "border-transparent hover:border-primary/30"
          }`}
        >
          {selectedAnimations.includes("ripple") && (
            <Check className="h-6 w-6"></Check>
          )}
          <p>ریپل</p>
        </Button>
        <Button
          ref={tactileBtnRef}
          onClick={(e) => handleBtnClick(e, "tactile")}
          className={`scale-pro h-[52px] w-[52px] flex-1 gap-1 border-2 bg-sad-blue/80 text-base text-primary transition-[border-color,background-color] duration-300 ${
            selectedAnimations.includes("tactile")
              ? "border-primary bg-primary text-primary-foreground hover:border-primary"
              : "border-transparent hover:border-primary/30"
          }`}
        >
          {selectedAnimations.includes("tactile") && (
            <Check className="h-6 w-6"></Check>
          )}
          <p>تکتایل</p>
        </Button>
      </section>
    </div>
  );
}
