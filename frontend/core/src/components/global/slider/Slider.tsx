"use client";

import React, { useEffect, useRef } from "react";

//components
import { Button } from "@/components/ui/button";
import { SliderNavigator } from "./SliderNavigator";
import SliderTitle from "./SliderTitle";

//hooks
import { useSliderTitle, useSlider } from "@/lib/stores";

//utils
import { cn } from "@/lib/utils";

//SVGs
import { Eye } from "lucide-react";

//types
type SliderType = {
  disableSubmitBtn?: boolean;
  submitBtnText?: string;
  children: React.ReactNode;
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
type stepType = {
  stepId: string;
  className?: string;
  children: React.ReactNode;
};

export function Slider({
  disableSubmitBtn,
  submitBtnText,
  children,
  validSections,
}: SliderType) {
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  const { updateTitle, updateSubtitle } = useSliderTitle();
  const { setActiveStepId, stepIndex, sectionIndex, activeStepHeight } =
    useSlider();

  const activeSection = validSections[sectionIndex];
  const activeStep = activeSection.steps[stepIndex];

  //update slider height according to active step(step height change/active step change)
  useEffect(() => {
    if (sectionsContainerRef.current) {
      sectionsContainerRef.current.style.height = `${activeStepHeight}px`;
    }
  }, [activeStepHeight]);

  useEffect(() => {
    if (activeStep?.id) {
      setActiveStepId(activeStep.id);
    }
    updateSubtitle(activeStep.subtitle);
  }, [activeStep?.id]);

  useEffect(() => {
    updateTitle(validSections[sectionIndex].title);
  }, [sectionIndex]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4 transition-all duration-300 ease-in-out sm:gap-7">
      <header className="flex w-full gap-1 justify-between items-center">
        <SliderTitle></SliderTitle>
        <Button className="lg:hidden rounded-full">
          <Eye></Eye>
          مشاهده منو
        </Button>
      </header>
      <div
        ref={sectionsContainerRef}
        className={`relative flex h-full w-full transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
      <footer className="flex w-full items-center justify-between">
        <SliderNavigator
          validSections={validSections}
          disableSubmitBtn={disableSubmitBtn}
          submitBtnText={submitBtnText}
        ></SliderNavigator>
      </footer>
    </section>
  );
}

export function SliderStep({ stepId, className, children }: stepType) {
  const stepRef = useRef<HTMLDivElement>(null);

  const { activeStepId, updateHeight } = useSlider();

  useEffect(() => {
    if (activeStepId === stepId && stepRef.current) {
      const observer = new ResizeObserver(() => {
        if (stepRef.current) {
          const newHeight = stepRef.current.offsetHeight;
          updateHeight(newHeight);
        }
      });
      observer.observe(stepRef.current);
      return () => observer.disconnect();
    }
  }, [activeStepId]);

  return (
    <div
      ref={stepRef}
      className={cn(
        "absolute flex w-full flex-col justify-between gap-4 ",
        className
      )}
    >
      {children}
    </div>
  );
}
