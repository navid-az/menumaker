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
  validSections: {
    title: string;
    steps: {
      id: string;
      subtitle: string;
      component: React.JSX.Element;
      show: boolean;
    }[];
  }[];
};

export function SliderNavigator({
  disableSubmitBtn = false,
  submitBtnText,
  validSections,
}: SliderNavigatorType) {
  const {
    sectionIndex,
    stepIndex,
    setSectionIndex,
    setStepIndex,
    setDirection,
  } = useSlider();

  const activeSection = validSections[sectionIndex];
  const sectionCount = validSections.length;

  const activeStep = activeSection.steps[stepIndex];
  const stepCount = activeSection.steps.length;

  // next/prev disability
  const [disabled, setDisabled] = useState<disabledStateType>("prevDisabled");

  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  // next/prev buttons animation
  useTactileAnimation(nextBtnRef, {});
  useTactileAnimation(prevBtnRef, {});
  useTactileAnimation(submitBtnRef, {});

  // disable buttons if it's the first/last step of all the steps
  useEffect(() => {
    if (stepIndex == stepCount - 1 && sectionIndex == sectionCount - 1) {
      setDisabled("nextDisabled");
    } else if (stepIndex == 0 && sectionIndex == 0) {
      setDisabled("prevDisabled");
    } else {
      setDisabled("");
    }
  }, [activeStep, sectionCount, stepCount]);

  // animate next/submit buttons according to disabled state
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

  // go to next step
  const goNext = () => {
    const isLastStepInSection = stepIndex === stepCount - 1;
    const isLastSection = sectionIndex === sectionCount - 1;

    setDirection(1);

    if (!isLastStepInSection) {
      setStepIndex(stepIndex + 1);
    } else if (!isLastSection) {
      setSectionIndex(sectionIndex + 1);
      setStepIndex(0);
    }
  };

  //go to previous step
  const goBack = () => {
    const isFirstStepInSection = stepIndex === 0;
    const isFirstSection = sectionIndex === 0;

    setDirection(-1);

    if (!isFirstStepInSection) {
      setStepIndex(stepIndex - 1);
    } else if (!isFirstSection) {
      setSectionIndex(sectionIndex - 1);
      setStepIndex(validSections[sectionIndex - 1].steps.length - 1);
    }
  };

  return (
    <div className="flex w-full items-center justify-between rtl:flex-row-reverse">
      <div className="flex basis-6/12 justify-end">
        <Button
          ref={prevBtnRef}
          type="button"
          disabled={disabled == "prevDisabled"}
          onClick={goBack}
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
            active={stepIndex == index}
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
          onClick={goNext}
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
  const { setStepIndex } = useSlider();

  return (
    <button
      type="button"
      onClick={() => setStepIndex(index)}
      className={`scale-pro h-3 w-3 cursor-pointer rounded-full transition-all duration-300 hover:bg-primary/50 sm:h-3.5 sm:w-3.5 ${
        active ? "scale-110 !bg-primary" : "scale-90 bg-sad-blue"
      }`}
    ></button>
  );
}
