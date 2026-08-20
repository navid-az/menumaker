"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";

//components
import { Button } from "@/components/ui/button";

//hooks
import { useSlider } from "@/lib/stores";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";
import { useStepValid } from "@/app/hooks/useStepValid";

//libraries
import gsap from "gsap";

//functions
import { cn } from "@/lib/utils";


//types
import type { SliderSection, Step } from "./Slider";
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

  // Tracks validity for every step in the active section, keyed by step id.
  // Each entry is populated by a <StepValidityTracker> mounted below, which
  // calls useStepValid exactly once per step (fixed hook-call count per
  // component instance, so it's safe even though stepCount varies by section).
  const [stepValidityMap, setStepValidityMap] = useState<Record<string, boolean>>({});

  const handleStepValidityChange = useCallback((id: string, valid: boolean) => {
    setStepValidityMap((prev) => (prev[id] === valid ? prev : { ...prev, [id]: valid }));
  }, []);

  // A dot is disabled if ANY step before it (within the same section) is mandatory and not yet valid 
  const isDotDisabled = useCallback(
    (index: number) => {
      console.log('isDotDisabled callback just ran');

      for (let i = 0; i < index; i++) {
        const step = activeSection.steps[i];
        const valid = stepValidityMap[step.id] ?? false;
        if (step.optional !== true && !valid) {
          return true;
        }
      }
      return false;
    },
    [activeSection, stepValidityMap]
  );

  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  // Tactile animation for navigation buttons
  useTactileAnimation(nextBtnRef, {});
  useTactileAnimation(prevBtnRef, {});
  useTactileAnimation(editBtnRef, {});
  useTactileAnimation(submitBtnRef, {});

  // Set initial active section and active step on mount
  useEffect(() => {
    setStepIndex(0);
    setSectionIndex(0);
  }, []);

  const isLastStep = stepIndex === stepCount - 1 && sectionIndex === sectionCount - 1;
  const isFirstStep = stepIndex === 0 && sectionIndex === 0;
  const isMandatoryIncomplete = activeStep.optional !== true && !isStepValid;

  // Disable Navigation buttons
  useEffect(() => {
    setPrevDisabled(isFirstStep);
    setNextDisabled(isLastStep || isMandatoryIncomplete);
  }, [activeStep, isStepValid, sectionCount, stepCount, stepIndex, sectionIndex]);

  // Next and submit button animation
  useEffect(() => {
    if (!disableSubmitBtn && !isEditing) {
      if (isLastStep) {
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
  }, [isLastStep]);

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

  // Automatically advance to the next step if autoAdvance is set to true
  const autoAdvancedStepId = useRef<string | null>(null);

  useEffect(() => {
    if (!activeStep.autoAdvance || !isStepValid) return;
    if (autoAdvancedStepId.current === activeStep.id) return; // already advanced from this step

    // Prevent auto advance from a retrigger between renders
    autoAdvancedStepId.current = activeStep.id;

    const timeout = setTimeout(() => {
      goNext();
    }, 350);

    return () => clearTimeout(timeout);
  }, [isStepValid, activeStep]);

  return (
    <div className="flex w-full items-center justify-between rtl:flex-row-reverse">
      {/* Invisible trackers: one per step in the active section, each reporting
          that step's validity up into stepValidityMap. Keyed by step.id so each
          mounts once and calls useStepValid a single, fixed number of times. */}
      {activeSection.steps.map((step) => (
        <StepValidityTracker key={step.id} step={step} onChange={handleStepValidityChange} />
      ))}

      <Button
        ref={prevBtnRef}
        type="button"
        disabled={prevDisabled}
        onClick={goBack}
        className="h-9 select-none rounded-full px-5 transition-opacity duration-300 sm:h-10 sm:px-6"
      >
        قبلی
      </Button>
      <div className={cn("w-full flex justify-center transition-all duration-200 ease-in-out")}>
        <div className="flex w-max gap-2 border border-royal-green/20 rounded-full bg-soft-blue p-2 rtl:flex-row-reverse">
          {Array.from({ length: stepCount }, (_, index) => (
            <SliderNavigatorDot
              key={index}
              index={index}
              active={stepIndex == index}
              disabled={isDotDisabled(index)}
            ></SliderNavigatorDot>
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

// Renders nothing. Exists purely to call useStepValid exactly once for a
// given step (keyed by step.id) and report the result upward, without
// forcing the parent to call the hook a variable number of times.
type StepValidityTrackerProps = {
  step: Step;
  onChange: (id: string, valid: boolean) => void;
};

function StepValidityTracker({ step, onChange }: StepValidityTrackerProps) {
  const valid = useStepValid(step.id, step.fields ?? []);

  useEffect(() => {
    onChange(step.id, valid);
  }, [step.id, valid, onChange]);

  return null;
}

type SliderNavigatorDot = { active?: boolean; index: number, disabled?: boolean };

function SliderNavigatorDot({ active, index, disabled = false }: SliderNavigatorDot) {
  const { setStepIndex } = useSlider();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setStepIndex(index)}
      className={cn("scale-pro h-3 w-3 cursor-pointer rounded-full transition-all duration-300 sm:h-3.5 sm:w-3.5", active ? "scale-110 bg-primary!" : "scale-90 bg-sad-blue", disabled ? 'bg-sad-blue/80 cursor-default' : 'bg-primary/20 hover:bg-primary/50')}
    ></button>
  );
}