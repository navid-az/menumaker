"use client";

import React, { useEffect, useState, useRef } from "react";

//components
import { Button } from "@/components/ui/button";

//hooks
import { useSlider } from "@/lib/stores";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation"; //animation hook

//libraries
import gsap from "gsap";

//types
type disabledStateType = "nextDisabled" | "prevDisabled" | "";
type SliderNavigatorType = {
  disableSubmitBtn?: boolean;
  submitBtnText?: string;
};

export function SliderNavigator({
  disableSubmitBtn = false,
  submitBtnText,
}: SliderNavigatorType) {
  const { activeSection, sectionCount, activeStep, stepCount, next, previous } =
    useSlider();

  // next/prev disability
  const [disabled, setDisabled] = useState<disabledStateType>("prevDisabled");

  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  //next/prev buttons animation
  useTactileAnimation(nextBtnRef, {});
  useTactileAnimation(prevBtnRef, {});
  useTactileAnimation(submitBtnRef, {});

  //disable buttons if it's the first/last step of all the steps
  useEffect(() => {
    if (activeStep == stepCount && activeSection == sectionCount) {
      setDisabled("nextDisabled");
    } else if (activeStep == 1 && activeSection == 1) {
      setDisabled("prevDisabled");
    } else {
      setDisabled("");
    }
  }, [activeStep, sectionCount, stepCount]);

  //animate next/submit buttons according to disabled state
  useEffect(() => {
    if (!disableSubmitBtn) {
      if (disabled === "nextDisabled") {
        if (submitBtnRef.current) {
          submitBtnRef.current.style.display = "flex";
        }
        gsap.to(submitBtnRef.current, {
          duration: 0.2,
          x: 0,
          opacity: 1,
        });

        gsap.to(nextBtnRef.current, {
          duration: 0.2,
          x: 0,
        });
      } else {
        gsap.to(submitBtnRef.current, {
          duration: 0.2,
          x: "100%",
          opacity: 0,
        });
        gsap.to(nextBtnRef.current, {
          duration: 0.2,
          x: "142%",
        });
      }
    }
  }, [disabled]);

  return (
    <div className="flex w-full items-center justify-between rtl:flex-row-reverse">
      <div className="flex basis-6/12 justify-end">
        <Button
          ref={prevBtnRef}
          type="button"
          disabled={disabled == "prevDisabled"}
          onClick={previous}
          className="h-9 select-none rounded-full px-5 transition-opacity duration-300 sm:h-10 sm:px-6"
        >
          قبلی
        </Button>
      </div>
      <div className="flex grow gap-1 rounded-full bg-soft-blue p-1 rtl:flex-row-reverse">
        {Array.from({ length: stepCount }, (_, index) => (
          <SliderNavigatorDot
            index={index}
            key={index}
            active={activeStep == index + 1}
          ></SliderNavigatorDot>
        ))}
      </div>
      <div ref={buttonsContainerRef} className="flex w-full basis-6/12 gap-2">
        {!disableSubmitBtn && (
          <Button
            ref={submitBtnRef}
            disabled={disabled != "nextDisabled"}
            className="h-9 select-none rounded-full px-5 opacity-0 sm:h-10 sm:px-6"
            type="submit"
          >
            {submitBtnText ? submitBtnText : "ایجاد منو"}
          </Button>
        )}

        <Button
          ref={nextBtnRef}
          type="button"
          disabled={disabled == "nextDisabled"}
          onClick={next}
          className="h-9 select-none rounded-full px-5 transition-opacity duration-300 sm:h-10 sm:px-6"
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}

type SliderNavigatorDot = {
  active?: boolean;
  index: number;
};

function SliderNavigatorDot({ active, index }: SliderNavigatorDot) {
  const { setActiveStep } = useSlider();

  const handleClick = () => {
    setActiveStep(index + 1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`scale-pro h-3 w-3 cursor-pointer rounded-full transition-all duration-300 hover:bg-primary/50 sm:h-3.5 sm:w-3.5 ${
        active ? "scale-110 !bg-primary" : "scale-90 bg-sad-blue"
      }`}
    ></button>
  );
}
