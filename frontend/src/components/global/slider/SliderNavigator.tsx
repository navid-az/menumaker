"use client";

import React, { useEffect, useState, useRef } from "react";

//components
import { Button } from "@/components/ui/button";

//hooks
import { useSlider } from "@/lib/stores";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";
import { useStepValid } from "@/app/hooks/useStepValid";

//libraries
import gsap from "gsap";

//types
import type { SliderSection } from "./Slider";
type SliderNavigatorType = {
  disableSubmitBtn?: boolean;
  isDirty?: boolean;
  isEditing?: boolean;
  submitBtnText?: string;
  validSections: SliderSection[]
};

export function SliderNavigator({
  disableSubmitBtn = false,
  isDirty = false,
  isEditing = false,
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

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const isStepValid = useStepValid(activeStep.id, activeStep.fields ?? []);

  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  useTactileAnimation(nextBtnRef, {});
  useTactileAnimation(prevBtnRef, {});
  useTactileAnimation(editBtnRef, {});
  useTactileAnimation(submitBtnRef, {});

  useEffect(() => {
    setStepIndex(0);
    setSectionIndex(0);
  }, []);

  useEffect(() => {
    const isLastStep = stepIndex === stepCount - 1 && sectionIndex === sectionCount - 1;
    const isFirstStep = stepIndex === 0 && sectionIndex === 0;
    const isMandatoryIncomplete = activeStep.optional !== true && !isStepValid;

    // Disable prev btn on first step
    setPrevDisabled(isFirstStep);

    // Disable Next btn when step is mandatory & incomplete OR on last step  
    setNextDisabled(isLastStep || isMandatoryIncomplete);
  }, [activeStep, isStepValid, sectionCount, stepCount, stepIndex, sectionIndex]);

  // Next and Submit btn animation
  useEffect(() => {
    if (!disableSubmitBtn && !isEditing) {
      if (nextDisabled) {
        if (submitBtnRef.current) {
          submitBtnRef.current.style.display = "flex";
        }
        gsap.to(submitBtnRef.current, { duration: 0.2, x: 0, opacity: 1 });
        gsap.to(nextBtnRef.current, { duration: 0.2, x: 0 });
      } else {
        gsap.to(submitBtnRef.current, { duration: 0.2, x: "100%", opacity: 0 });
        gsap.to(nextBtnRef.current, { duration: 0.2, x: "142%" });
      }
    }
  }, [nextDisabled]);

  // Go to next step/section
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

  // Go to previous step/section
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
      <Button
        ref={prevBtnRef}
        type="button"
        disabled={prevDisabled}
        onClick={goBack}
        className="h-9 select-none rounded-full px-5 transition-opacity duration-300 sm:h-10 sm:px-6"
      >
        قبلی
      </Button>
      <div className="w-full flex justify-center">
        <div className="flex w-max gap-2 border border-royal-green/20 rounded-full bg-soft-blue p-2 rtl:flex-row-reverse">
          {Array.from({ length: stepCount }, (_, index) => (
            <SliderNavigatorDot index={index} key={index} active={stepIndex == index}></SliderNavigatorDot>
          ))}
        </div>
      </div>
      <div ref={buttonsContainerRef} className="flex gap-2">
        {!disableSubmitBtn && !isEditing && (
          <Button
            ref={submitBtnRef}
            disabled={!nextDisabled}
            className="h-9 select-none rounded-full px-5 opacity-0 sm:h-10 sm:px-6"
            type="submit"
          >
            {submitBtnText ? submitBtnText : "ایجاد منو"}
          </Button>
        )}
        {isEditing && (
          <Button
            ref={editBtnRef}
            disabled={!isDirty}
            className="h-9 select-none rounded-full transition-opacity duration-300 px-5 sm:h-10 sm:px-6"
            type="submit"
          >
            ویرایش منو
          </Button>
        )}
        <Button
          ref={nextBtnRef}
          type="button"
          disabled={nextDisabled}
          onClick={goNext}
          className="h-9 select-none rounded-full px-5 transition-opacity duration-300 sm:h-10 sm:px-6"
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}

type SliderNavigatorDot = { active?: boolean; index: number };

function SliderNavigatorDot({ active, index }: SliderNavigatorDot) {
  const { setStepIndex } = useSlider();
  return (
    <button
      type="button"
      onClick={() => setStepIndex(index)}
      className={`scale-pro h-3 w-3 cursor-pointer rounded-full transition-all duration-300 hover:bg-primary/50 sm:h-3.5 sm:w-3.5 ${active ? "scale-110 bg-primary!" : "scale-90 bg-sad-blue"
        }`}
    ></button>
  );
}