"use client";

import React, { useEffect, useRef } from "react";

//libraries
import gsap from "gsap";

//components
import { SliderNavigator } from "./SliderNavigator";
import SliderTitle from "./SliderTitle";

//hooks
import { useSlider, useSliderTitle } from "@/lib/stores";

//utils
import { cn } from "@/lib/utils";

//types
type sectionType = {
  sectionNum: number;
  title: string;
  children: React.ReactNode;
};

type stepType = {
  sectionNum: number;
  stepNum: number;
  title: string;
  className?: string;
  children: React.ReactNode;
};

export function Slider({ children }: { children: React.ReactNode }) {
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  const activeStepHeight = useSlider((state) => state.activeStepHeight);

  //update slider height according to active step(step height change/active step change)
  useEffect(() => {
    if (sectionsContainerRef.current) {
      sectionsContainerRef.current.style.height = `${activeStepHeight}px`;
    }
  }, [activeStepHeight]);

  return (
    <section className="container flex h-screen w-screen flex-col items-center justify-center gap-4 p-2 transition-all duration-300 ease-in-out xs:px-4 x:px-12 sm:gap-7">
      <header className="flex w-full flex-col gap-1">
        <SliderTitle></SliderTitle>
      </header>
      <div
        ref={sectionsContainerRef}
        className={`relative flex h-full w-full transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
      <footer className="flex w-full items-center justify-between">
        <SliderNavigator></SliderNavigator>
      </footer>
    </section>
  );
}

export function SliderSection({ sectionNum, title, children }: sectionType) {
  const builderSectionRef = useRef<HTMLDivElement>(null);

  const activeSection = useSlider((state) => state.activeSection);
  const updateActiveStepCount = useSlider(
    (state) => state.updateActiveStepCount
  );

  const updateTitle = useSliderTitle((state) => state.updateTitle);

  useEffect(() => {
    if (sectionNum == activeSection) {
      //update title according to active section
      updateTitle(title);

      //update step count according to active section
      if (builderSectionRef.current) {
        updateActiveStepCount(builderSectionRef.current.childElementCount);
      }
    }
  }, [activeSection]);

  return (
    <section
      ref={builderSectionRef}
      className={`absolute flex w-full flex-col gap-2 transition duration-200 ease-in-out`}
    >
      {children}
    </section>
  );
}

export function SliderStep({
  sectionNum,
  stepNum,
  title,
  className,
  children,
}: stepType) {
  const stepRef = useRef<HTMLDivElement>(null);

  const activeSection = useSlider((state) => state.activeSection);
  const activeStep = useSlider((state) => state.activeStep);
  const stepCount = useSlider((state) => state.stepCount);
  const updateHeight = useSlider((state) => state.updateHeight);

  const updateSubtitle = useSliderTitle((state) => state.updateSubtitle);

  useEffect(() => {
    if (stepRef.current) {
      const step = stepRef.current;

      //show active step
      if (stepNum == activeStep && activeSection == sectionNum) {
        //update subtitle according to active step
        updateSubtitle(title);

        gsap.to(step, {
          x: 0,
          duration: 0.05,
          opacity: 1,
          pointerEvents: "auto",
        });

        //update slider height on active step change/active step height change
        const updateStepContainerHeight = () => {
          const height = step.clientHeight;
          updateHeight(height);
        };

        // Create a ResizeObserver
        const resizeObserver = new ResizeObserver(updateStepContainerHeight);

        // Observe active step
        if (stepRef.current) {
          resizeObserver.observe(stepRef.current);
        }

        // Clean up the observer when the component unmounts
        return () => {
          resizeObserver.disconnect();
        };
      }
      //hide previous step
      else if (
        (stepNum < activeStep && sectionNum == activeSection) ||
        (stepNum == stepCount && sectionNum < activeSection)
      ) {
        gsap.to(step, {
          x: -200,
          duration: 0.05,
          opacity: 0,
          pointerEvents: "none",
        });
      }
      //hide next step
      else if (
        (stepNum > activeStep && sectionNum == activeSection) ||
        (stepNum == 1 && sectionNum > activeSection)
      ) {
        gsap.to(step, {
          x: 200,
          duration: 0.05,
          opacity: 0,
          pointerEvents: "none",
        });
      }
    }
  }, [activeStep]);

  return (
    <div
      ref={stepRef}
      className={cn(
        "pointer-events-none absolute flex w-full translate-x-[200px] flex-col justify-between gap-4 opacity-0 transition duration-200 ease-in-out",
        className
      )}
    >
      {children}
    </div>
  );
}
