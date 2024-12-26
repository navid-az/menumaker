import React, { useEffect, useRef, useState } from "react";

//Components
import { Button } from "@/components/ui/button";

//Hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation"; //animation hook
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation"; //animation hook

//Types
type AnimationOptionsType = "ripple" | "tactile" | "ripple-tactile" | "none";

//SVGs
import { Sparkles, X } from "lucide-react";

//libraries
import { useFormContext } from "react-hook-form";

export default function AnimationSelector() {
  const [activeBtn, setActiveBtn] = useState<AnimationOptionsType>("none");

  const previewBtnRef = useRef<HTMLButtonElement>(null);

  const tactileBtnRef = useRef<HTMLButtonElement>(null);
  const rippleBtnRef = useRef<HTMLButtonElement>(null);
  const rippleTactileBtnRef = useRef<HTMLButtonElement>(null);
  const noneBtnRef = useRef<HTMLButtonElement>(null);

  const { watch } = useFormContext();
  const colors = watch("color_palette");

  //animation for animation buttons
  useTactileAnimation(rippleBtnRef, { scale: 0.04 });
  useTactileAnimation(tactileBtnRef, { scale: 0.04 });
  useTactileAnimation(rippleTactileBtnRef, { scale: 0.04 });
  useTactileAnimation(noneBtnRef, { scale: 0.04 });

  const triggerRippleAnimation = useRippleAnimation(
    previewBtnRef,
    {},
    activeBtn === "ripple" || activeBtn === "ripple-tactile"
  );
  const triggerTactileAnimation = useTactileAnimation(
    previewBtnRef,
    {},
    activeBtn === "tactile" || activeBtn === "ripple-tactile"
  );

  const handleBtnClick = (
    e: React.MouseEvent,
    animationType: AnimationOptionsType
  ) => {
    e.preventDefault();
    setActiveBtn(animationType);

    //Trigger the selected animation immediately
    if (animationType === "ripple") {
      triggerRippleAnimation();
    } else if (animationType === "tactile") {
      triggerTactileAnimation();
    } else if (animationType === "ripple-tactile") {
      triggerRippleAnimation();
      triggerTactileAnimation();
    }
  };

  useEffect(() => {
    if (activeBtn === "ripple") {
      triggerRippleAnimation();
    } else if (activeBtn === "tactile") {
      triggerTactileAnimation();
    } else if (activeBtn === "ripple-tactile") {
      triggerRippleAnimation();
      triggerTactileAnimation();
    }
  }, [activeBtn]);

  const handlePreviewBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-max w-full flex-col items-end gap-4 rounded-md">
      <Button
        disabled={activeBtn === "none"}
        onClick={handlePreviewBtnClick}
        ref={previewBtnRef}
        className="scale-pro flex gap-2 border-2 shadow-sm transition-opacity duration-300"
        style={{
          backgroundColor: colors ? colors[1] : "blue",
          color: colors ? colors[0] : "blue",
          borderColor: colors ? colors[0] : "blue",
        }}
      >
        <Sparkles className="h-5 w-5"></Sparkles>
        <p className="font-normal">نمونه انیمیشن</p>
      </Button>
      <section className="flex w-full gap-2">
        <Button
          ref={tactileBtnRef}
          onClick={(e) => handleBtnClick(e, "tactile")}
          className={`scale-pro h-[52px] w-[52px] flex-1 border-2 bg-sad-blue/80 px-4 text-primary transition-[border-color] duration-300 ${
            activeBtn === "tactile"
              ? "border-primary hover:border-primary"
              : "border-transparent hover:border-primary/30"
          }`}
        >
          Ripple
        </Button>
        <Button
          ref={rippleBtnRef}
          onClick={(e) => handleBtnClick(e, "ripple")}
          className={`scale-pro h-[52px] w-[52px] flex-1 border-2 bg-sad-blue/80 px-4 text-primary transition-[border-color] duration-300 ${
            activeBtn === "ripple"
              ? "border-primary hover:border-primary"
              : "border-transparent hover:border-primary/30"
          }`}
        >
          Tactile
        </Button>
        <Button
          ref={rippleTactileBtnRef}
          onClick={(e) => handleBtnClick(e, "ripple-tactile")}
          className={`scale-pro h-[52px] w-[52px] flex-1 border-2 bg-sad-blue/80 px-4 text-primary transition-[border-color] duration-300 ${
            activeBtn === "ripple-tactile"
              ? "border-primary hover:border-primary"
              : "border-transparent hover:border-primary/30"
          }`}
        >
          Ripple & Tactile
        </Button>
        <Button
          size="icon"
          ref={noneBtnRef}
          onClick={(e) => handleBtnClick(e, "none")}
          className={`scale-pro aspect-square h-[52px] w-[52px] border-2 bg-sad-blue/80 text-primary transition-[border-color] duration-300 ${
            activeBtn === "none"
              ? "border-primary hover:border-primary"
              : "border-transparent hover:border-primary/30"
          }`}
        >
          <X></X>
        </Button>
      </section>
    </div>
  );
}
