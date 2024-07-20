"use client";

import React, { useEffect, useState } from "react";

//components
import { Button } from "@/components/ui/button";

//hooks
import { useBuilderTabs } from "@/lib/stores";

type disabledStateType = "nextDisabled" | "prevDisabled" | "";

export function BuilderTabsNavigator() {
  const activeSection = useBuilderTabs((state) => state.activeSection);
  const sectionCount = useBuilderTabs((state) => state.sectionCount);
  const activeStep = useBuilderTabs((state) => state.activeStep);
  const stepCount = useBuilderTabs((state) => state.stepCount);
  const increaseActiveSection = useBuilderTabs(
    (state) => state.increaseActiveSection
  );
  const decreaseActiveSection = useBuilderTabs(
    (state) => state.decreaseActiveSection
  );
  const increaseActiveStep = useBuilderTabs(
    (state) => state.increaseActiveStep
  );
  const decreaseActiveStep = useBuilderTabs(
    (state) => state.decreaseActiveStep
  );
  //if last step change active step to 1
  //if first step change active step to stepCount
  const updateActiveStep = useBuilderTabs((state) => state.updateActiveStep);

  // next/prev disability
  const [disabled, setDisabled] = useState<disabledStateType>("");
  //start with prev button being disabled
  useEffect(() => {
    setDisabled("prevDisabled");
  }, []);

  //when next button is clicked
  const handleNext = () => {
    setDisabled("");
    if (activeStep != stepCount) {
      if (activeStep == stepCount - 1 && activeSection == sectionCount) {
        setDisabled("nextDisabled");
      }
      increaseActiveStep(activeStep);
    } else if (activeStep == stepCount && activeSection != sectionCount) {
      increaseActiveSection(activeSection);
      updateActiveStep();
    }
  };

  //when previous button is clicked
  const handlePrev = () => {
    setDisabled("");
    if (activeStep > 1) {
      if (activeStep == 2 && activeSection == 1) {
        setDisabled("prevDisabled");
      }
      decreaseActiveStep(activeStep);
    } else if (activeStep == 1 && activeSection != 1) {
      decreaseActiveSection(activeSection);
      setTimeout(() => {
        updateActiveStep();
      });
    }
  };

  return (
    <>
      <Button
        disabled={disabled == "nextDisabled"}
        onClick={handleNext}
        className={`h-9 select-none rounded-full px-5 transition-opacity duration-300 sm:h-10 sm:px-6`}
      >
        بعدی
      </Button>
      <div className="flex gap-1 rounded-full bg-soft-blue p-1 rtl:flex-row-reverse">
        {/* step:{activeStep} , stepCount:{stepCount}
        <br />
        section:{activeSection}, sectionCount:{sectionCount} */}
        {Array.from({ length: stepCount }, (_, index) => (
          <BuilderTabsNavigatorDot
            index={index}
            key={index}
            active={activeStep == index + 1}
          ></BuilderTabsNavigatorDot>
        ))}
      </div>
      <Button
        disabled={disabled == "prevDisabled"}
        onClick={handlePrev}
        className="h-9 select-none rounded-full px-5 transition-opacity duration-300 sm:h-10 sm:px-6"
      >
        قبلی
      </Button>
    </>
  );
}

type BuilderTabsNavigatorDot = {
  active?: boolean;
  index: number;
};

function BuilderTabsNavigatorDot({ active, index }: BuilderTabsNavigatorDot) {
  const setActiveStep = useBuilderTabs((state) => state.setActiveStep);

  const handleClick = () => {
    setActiveStep(index + 1);
  };

  return (
    <button
      onClick={handleClick}
      className={`scale-pro h-3 w-3 cursor-pointer rounded-full transition-all duration-300 hover:bg-primary/50 sm:h-3.5 sm:w-3.5 ${
        active ? "scale-110 !bg-primary" : "scale-90 bg-sad-blue"
      }`}
    ></button>
  );
}
