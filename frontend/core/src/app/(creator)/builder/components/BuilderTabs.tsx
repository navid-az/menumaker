"use client";

import React, { useEffect, useRef } from "react";

//libraries
import gsap from "gsap";

//components
import { BuilderTabsNavigator } from "./BuilderTabsNavigator";
import BuilderTabsTitle from "./BuilderTabsTitle";

//hooks
import { useBuilderTabs, useBuilderTabsTitle } from "@/lib/stores";

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
  className?: string;
  children: React.ReactNode;
};

export function BuilderTabs({ children }: { children: React.ReactNode }) {
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  const activeStepHeight = useBuilderTabs((state) => state.activeStepHeight);

  //change the height of the tabs container depending on the height of the active section
  useEffect(() => {
    if (sectionsContainerRef.current) {
      sectionsContainerRef.current.style.height = `${activeStepHeight}px`;
    }
  }, [activeStepHeight]);

  return (
    <section className="container flex h-screen w-screen flex-col items-center justify-center gap-4 p-2 transition-all duration-300 ease-in-out xs:px-4 x:px-12 sm:gap-7">
      <header className="w-full">
        <BuilderTabsTitle></BuilderTabsTitle>
      </header>
      <div
        ref={sectionsContainerRef}
        className={`relative flex h-full w-full transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
      <footer className="flex w-full items-center justify-between">
        <BuilderTabsNavigator></BuilderTabsNavigator>
      </footer>
    </section>
  );
}

export function BuilderTabsSection({
  sectionNum,
  title,
  children,
}: sectionType) {
  const builderSectionRef = useRef<HTMLDivElement>(null);

  const activeSection = useBuilderTabs((state) => state.activeSection);
  const updateActiveStepCount = useBuilderTabs(
    (state) => state.updateActiveStepCount
  );

  const updateTitle = useBuilderTabsTitle((state) => state.updateTitle);

  //set step count whenever active section changes
  useEffect(() => {
    if (sectionNum == activeSection) {
      updateTitle(title);

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

export function BuilderTabsStep({
  sectionNum,
  stepNum,
  className,
  children,
}: stepType) {
  const stepRef = useRef<HTMLDivElement>(null);

  const activeSection = useBuilderTabs((state) => state.activeSection);
  const activeStep = useBuilderTabs((state) => state.activeStep);
  const stepCount = useBuilderTabs((state) => state.stepCount);
  const updateHeight = useBuilderTabs((state) => state.updateHeight);

  useEffect(() => {
    if (stepRef.current) {
      const step = stepRef.current;

      //show the active section
      if (stepNum == activeStep && activeSection == sectionNum) {
        gsap.to(step, {
          x: 0,
          duration: 0.05,
          opacity: 1,
          pointerEvents: "auto",
        });
        const height = step.offsetHeight;
        updateHeight(height);
        //hide previous section
      } else if (
        (stepNum < activeStep && sectionNum == activeSection) ||
        (stepNum == stepCount && sectionNum < activeSection)
      ) {
        gsap.to(step, {
          x: -200,
          duration: 0.05,
          opacity: 0,
          pointerEvents: "none",
        });
        //hide next section
      } else if (
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
  });

  return (
    <div
      ref={stepRef}
      className={cn(
        "pointer-events-none absolute flex w-full translate-x-[200px] flex-col justify-between gap-4 opacity-0 transition duration-200 ease-in-out sm:gap-7",
        className
      )}
    >
      {/* stepNum:{stepNum} sectionNum:{sectionNum} */}
      {children}
    </div>
  );
}
