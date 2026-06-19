"use client";

import React, { useEffect, useRef } from "react";

//components
import { Button } from "@/components/ui/button";
import SliderTitle from "./SliderTitle";

//hooks
import { useSliderTitle, useSlider } from "@/lib/stores";

//utils
import { cn } from "@/lib/utils";

//SVGs
import { Eye } from "lucide-react";

//types
type SliderType = {
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

export function Slider({ children, validSections }: SliderType) {
  const { updateTitle, updateSubtitle } = useSliderTitle();
  const { setActiveStepId, stepIndex, sectionIndex } = useSlider();

  const activeSection = validSections[sectionIndex];
  const activeStep = activeSection.steps[stepIndex];

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
      {children}
    </section>
  );
}

export function SliderHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex w-full gap-1 justify-between items-center">
      {children}
    </header>
  );
}

export function SliderBody({ children }: { children: React.ReactNode }) {
  const sliderBodyRef = useRef<HTMLDivElement>(null);
  const { activeStepHeight } = useSlider();

  //Update slider body height based on active step's height
  useEffect(() => {
    if (sliderBodyRef.current) {
      sliderBodyRef.current.style.height = `${activeStepHeight}px`;
    }
  }, [activeStepHeight]);

  return (
    <div
      ref={sliderBodyRef}
      className={`relative flex h-full w-full transition-all duration-300 ease-in-out`}
    >
      {children}
    </div>
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

export function SliderFooter({ children }: { children: React.ReactNode }) {
  return (
    <footer className="flex w-full items-center justify-between">
      {children}
    </footer>
  );
}
