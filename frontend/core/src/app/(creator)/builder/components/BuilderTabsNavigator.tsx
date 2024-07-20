"use client";

import React, { useState } from "react";

//components
import { Button } from "@/components/ui/button";

//hooks
import { useBuilderTabs } from "@/lib/stores";

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

  const [disabled, setDisabled] = useState(false);

  //when next button is clicked
  const handleNext = () => {
    if (activeStep != stepCount) {
      increaseActiveStep(activeStep);
    } else if (activeStep == stepCount && activeSection != sectionCount) {
      increaseActiveSection(activeSection);
      updateActiveStep();
    }
  };

  //when previous button is clicked
  const handlePrev = () => {
    if (activeStep > 1) {
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
        disabled={disabled}
        onClick={handleNext}
        className={`h-9 select-none rounded-full px-5 sm:h-10 sm:px-6`}
      >
        بعدی
      </Button>
      <div className="flex gap-1 rounded-full bg-soft-blue p-1 rtl:flex-row-reverse">
        step:{activeStep} , stepCount:{stepCount}
        <br />
        section:{activeSection}, sectionCount:{sectionCount}
        {Array.from({ length: stepCount }, (_, index) => (
          <BuilderTabsNavigatorDot
            key={index}
            active={activeStep == index + 1}
          ></BuilderTabsNavigatorDot>
        ))}
      </div>
      <Button
        onClick={handlePrev}
        className="h-9 select-none rounded-full px-5 sm:h-10 sm:px-6"
      >
        قبلی
      </Button>
    </>
  );
}

export function BuilderTabsNavigatorDot({ active }: { active?: boolean }) {
  return (
    <div
      className={`scale-pro h-3 w-3 cursor-pointer rounded-full border-2 transition-all duration-300 hover:scale-110 hover:border-primary sm:h-3.5 sm:w-3.5 ${
        active ? "border-primary bg-primary" : "border-sad-blue bg-sad-blue"
      }`}
    ></div>
  );
}
