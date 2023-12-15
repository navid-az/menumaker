// import Button from "@/app/components/Button";
import { useEffect, useState } from "react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";

export default function StepNavigator({
  setFormHeight,
  setSectionTitle,
  setCurrentStep,
  currentStep,
}) {
  const [sectionCount, setSectionCount] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const [stepCount, setStepCount] = useState(1);
  const [currentStepNum, setCurrentStepNum] = useState(1);

  // will change depending on which changeStepBtn has been clicked(next/prev)
  const [changeStepBtn, setChangeStepBtn] = useState("next");

  useEffect(() => {
    let formWrapper = document.getElementById("form-wrapper");

    // calculating sectionCount
    setSectionCount(formWrapper.childNodes.length);
  }, []);

  useEffect(() => {
    // count current section's steps
    let stepsCount = document.querySelector(`#form-section-${currentSection}`)
      .childNodes.length;
    setStepCount(stepsCount);
    if (changeStepBtn == "next") {
      setCurrentStepNum(1);
    } else if (changeStepBtn == "prev") {
      let stepCounts = document.querySelector(`#form-section-${currentSection}`)
        .childNodes.length;
      setCurrentStepNum(stepCounts);
    }

    // change section title depending on the current section
    let titles = ["صفحه اصلی", "صفحه آیتم ها", "صفحه سفارشات"];
    let currentSectionTitle = document.getElementById("section-title");

    gsap.to(currentSectionTitle, { x: 200, duration: 0.25, opacity: 0 });
    gsap.to(currentSectionTitle, { x: 0, duration: 0.25, opacity: 1 });
    setSectionTitle(titles[currentSection - 1]);
  }, [currentSection]);

  useEffect(() => {
    // animating prev and next steps when the next/prev btn is clicked
    if (changeStepBtn == "next") {
      if (currentStepNum != 1) {
        let prevStep = document.querySelector(
          `#form-section-${currentSection} ul:nth-child(${currentStepNum - 1})`
        );
        gsap.to(prevStep, {
          x: -200,
          duration: 0.05,
          opacity: 0,
          pointerEvents: "none",
        });
      } else if (currentSection > 1 && currentStepNum == 1) {
        let prevSectionLastChild = document.querySelector(
          `#form-section-${currentSection - 1}`
        ).lastChild;
        gsap.to(prevSectionLastChild, {
          x: -200,
          duration: 0.05,
          opacity: 0,
          pointerEvents: "none",
        });
      }
    } else if (changeStepBtn == "prev") {
      if (currentStepNum != stepCount) {
        let nextStep = document.querySelector(
          `#form-section-${currentSection} ul:nth-child(${currentStepNum + 1})`
        );
        gsap.to(nextStep, {
          x: 200,
          duration: 0.05,
          opacity: 0,
          pointerEvents: "none",
        });
      }
      if (currentSection < sectionCount && currentStepNum == stepCount) {
        let nextSectionLastChild = document.querySelector(
          `#form-section-${currentSection + 1}`
        ).firstChild;
        gsap.to(nextSectionLastChild, {
          x: 200,
          duration: 0.05,
          opacity: 0,
          pointerEvents: "none",
        });
      }
    }

    // shows the current step after the change btn click
    let currentStepsElement = document.querySelector(
      `#form-section-${currentSection} ul:nth-child(${currentStepNum})`
    );
    setCurrentStep(currentStepsElement);

    // changes the form height depending on step's height
    setFormHeight(currentStepsElement.offsetHeight);

    gsap.to(currentStepsElement, {
      x: 0,
      duration: 0.05,
      opacity: 1,
      pointerEvents: "auto",
      delay: 0.03,
    });
  }, [currentStepNum]);

  // for when the change buttons are clicked(next/prev)
  const handleChangeBtn = (e) => {
    e.preventDefault();
    if (e.target.name == "next") {
      setChangeStepBtn("next");
      // if its the last step don't move anymore
      if (currentSection == sectionCount && currentStepNum == stepCount) {
        // wiggle.restart();
      } else {
        // move to the 'next' step
        if (stepCount != currentStepNum) {
          setCurrentStepNum(currentStepNum + 1);
        } else {
          setCurrentSection(currentSection + 1);
        }
      }
    } else if (e.target.name == "prev") {
      // move to the 'prev' step
      setChangeStepBtn("prev");
      if (currentSection == 1 && currentStepNum == 1) {
      } else {
        if (currentStepNum != 1) {
          setCurrentStepNum(currentStepNum - 1);
        } else {
          setCurrentSection(currentSection - 1);
        }
      }
    }
  };

  const handleDotBtn = (btnId) => {
    let difference = Math.abs(btnId - currentStepNum);

    if (currentStepNum > btnId) {
      setChangeStepBtn("prev");
      for (let i = 1; i <= difference; i++) {
        gsap.to(currentStep, {
          x: -200,
          duration: 0.05,
          opacity: 0,
          delay: 0.03,
        });
      }
    } else if (currentStepNum < btnId) {
      setChangeStepBtn("next");
      gsap.to(currentStep, {
        x: 200,
        duration: 0.05,
        opacity: 0,
        delay: 0.03,
      });
    }
    setCurrentStepNum(btnId);
  };

  return (
    <>
      <Button
        name="prev"
        onClick={(e) => handleChangeBtn(e, currentSection)}
        className="rounded-full bg-royal-green px-4 py-1 text-xs text-sky-blue sm:text-sm"
        size="sm"
      >
        قبلی
      </Button>
      <div className="flex w-min items-center justify-between gap-1 rounded-full bg-soft-blue p-2">
        {[...Array(stepCount)].map((e, i) => (
          <span
            onClick={() => handleDotBtn(i + 1)}
            className={`${
              currentStepNum == i + 1
                ? "border-royal-green bg-royal-green"
                : "border-sad-blue bg-sad-blue"
            } border-1 h-3 w-3 cursor-pointer select-none rounded-full border-2 transition duration-200 ease-in-out hover:border-2 hover:border-royal-green hover:bg-sky-blue`}
          ></span>
        ))}
      </div>
      <Button
        name="next"
        onClick={(e) => handleChangeBtn(e, currentSection)}
        className="rounded-full bg-royal-green px-4 py-1 text-xs text-sky-blue sm:text-sm"
        size="sm"
      >
        بعدی
      </Button>
    </>
  );
}
