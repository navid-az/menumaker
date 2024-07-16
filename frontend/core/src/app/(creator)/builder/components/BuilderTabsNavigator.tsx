"use client";

import React from "react";

//components
import { Button } from "@/components/ui/button";

//hooks
import { useBuilderTabs } from "@/lib/stores";

export function BuilderTabsNavigator() {
  const sectionCount = useBuilderTabs((state) => state.sectionCount);
  const activeSection = useBuilderTabs((state) => state.activeSection);
  const increaseActiveSection = useBuilderTabs(
    (state) => state.increaseActiveSection
  );
  const decreaseActiveSection = useBuilderTabs(
    (state) => state.decreaseActiveSection
  );

  const handleNext = () => {
    if (activeSection < sectionCount) {
      increaseActiveSection(activeSection);
    }
  };
  const handlePrev = () => {
    if (activeSection >= 2) {
      decreaseActiveSection(activeSection);
    }
  };

  return (
    <>
      <Button
        onClick={handleNext}
        className="h-9 rounded-full px-5 sm:h-10 sm:px-6"
      >
        بعدی
      </Button>
      {/* {activeSection}-{sectionCount} */}
      <div className="flex gap-1 rounded-full bg-soft-blue p-1 rtl:flex-row-reverse">
        {Array.from({ length: sectionCount }, (_, index) => (
          <BuilderTabsNavigatorDot
            key={index}
            active={activeSection == index + 1}
          ></BuilderTabsNavigatorDot>
        ))}
      </div>
      <Button
        onClick={handlePrev}
        className="h-9 rounded-full px-5 sm:h-10 sm:px-6"
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
