"use client";

import { useEffect } from "react";

//components
import Setup from "../components/Setup";

//hooks
import { useSlider } from "@/lib/stores";

export default function page() {
  const stepCount = useSlider((state) => state.stepCount);
  const activeStep = useSlider((state) => state.activeStep);
  const sectionCount = useSlider((state) => state.sectionCount);
  const activeSection = useSlider((state) => state.activeSection);
  const updateSectionCount = useSlider((state) => state.updateSectionCount);

  useEffect(() => {
    updateSectionCount(3);
  }, []);

  return (
    <section className="container h-screen w-full px-40">
      {/* <div className="flex flex-col bg-red-200">
        <div>
          <p>step count</p>
          {stepCount}
        </div>
        <div>
          <p>active step</p> {activeStep}
        </div>
        <div>
          <p>section count</p> {sectionCount}
        </div>
        <div>
          <p>active section</p> {activeSection}
        </div>
      </div> */}
      <Setup></Setup>
    </section>
  );
}
