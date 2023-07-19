"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FormTabInput } from "@/app/components/inputs";
import { ToggleBtn, RadioBtn } from "@/app/components/buttons";
import { gsap } from "gsap";

function SmallTiles({ value }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-sad-blue p-2">
      {value.linkType}
      {value.icon != "" ? (
        <Image src={value.icon} width={24} height={24}></Image>
      ) : (
        ""
      )}
    </div>
  );
}

///////////////////////toggle btn

export function FormTab({
  title,
  description,
  icon_src,
  input_type = "",
  id = "",
  children,
}) {
  const tabRef = useRef(null);
  const [btn, setBtn] = useState(false);
  ///////////////////toggle btn action function
  return (
    <li
      id={`form-tab-${id}`}
      ref={tabRef}
      className="duration-2000 flex w-96 cursor-pointer select-none flex-col items-end justify-between  gap-2 rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royale-green transition-all ease-in-out"
    >
      <div className="flex w-full items-center justify-between">
        {children}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          {icon_src ? (
            <Image
              src={icon_src}
              width={30}
              height={30}
              alt="section icon"
            ></Image>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="text-end font-normal">{description}</p>
      {input_type == "text" ? <FormTabInput id={id}></FormTabInput> : ""}
    </li>
  );
}

//////////////////form step ///////////////
export function FormStep({ children }) {
  return (
    <section
      className={
        "form-sections invisible absolute flex h-min w-96 flex-1 translate-x-[200px] flex-col items-end justify-between gap-7 opacity-0 transition duration-200 ease-in-out"
      }
    >
      {children}
    </section>
  );
}

export default function Form({ title }) {
  // const formTabWrapperRef = useRef(null);
  // const FormSectionRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(1);
  const [sectionCount, setSectionCount] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepCount, setStepCount] = useState(1);
  // will change depending on which changeStepBtn has been clicked(next/prev)
  const [changeStepBtn, setChangeStepBtn] = useState("next");

  let titles = ["صفحه اصلی", "صفحه آیتم ها", "صفحه سفارشات"];
  const [sectionTitle, setSectionTitle] = useState();

  const [mainPageType, setMainPageType] = useState(titles[0]);
  const [links, setLinks] = useState([]);

  // calculating sectionCount
  useEffect(() => {
    let sectionCount = document.getElementById("form-wrapper");
    setSectionCount(sectionCount.childNodes.length);
  }, []);

  // calculate current section step count
  useEffect(() => {
    let stepsCount = document.querySelector(
      `#form-section-${currentSection} div`
    ).childNodes.length;
    setStepCount(stepsCount);
    if (changeStepBtn == "next") {
      setCurrentStep(1);
    } else if (changeStepBtn == "prev") {
      let stepCounts = document.querySelector(
        `#form-section-${currentSection} div`
      ).childNodes.length;
      setCurrentStep(stepCounts);
    }
    // change section title depending on the current section
    let currentSectionTitle = document.getElementById("section-title");
    gsap.to(currentSectionTitle, { x: 200, duration: 0.25, opacity: 0 });
    setSectionTitle(titles[currentSection - 1]);
    gsap.to(currentSectionTitle, { x: 0, duration: 0.25, opacity: 1 });
  }, [currentSection]);

  useEffect(() => {
    // animating prev and next steps when the next/prev btn is clicked
    if (changeStepBtn == "next") {
      if (currentStep != 1) {
        let prevStep = document.querySelector(
          `#form-section-${currentSection} div section:nth-child(${
            currentStep - 1
          })`
        );
        // prevStep.style.background = "green";
        gsap.to(prevStep, {
          x: -200,
          duration: 0.05,
          opacity: 0,
        });
      } else if (currentSection > 1 && currentStep == 1) {
        let prevSectionLastChild = document.querySelector(
          `#form-section-${currentSection - 1} div`
        ).lastChild;
        gsap.to(prevSectionLastChild, {
          x: -200,
          duration: 0.05,
          opacity: 0,
        });
      }
    } else if (changeStepBtn == "prev") {
      if (currentStep != stepCount) {
        let nextStep = document.querySelector(
          `#form-section-${currentSection} div section:nth-child(${
            currentStep + 1
          })`
        );
        gsap.to(nextStep, {
          x: 200,
          duration: 0.05,
          opacity: 0,
        });
      }
      if (currentSection < sectionCount && currentStep == stepCount) {
        let nextSectionLastChild = document.querySelector(
          `#form-section-${currentSection + 1} div`
        ).firstChild;
        gsap.to(nextSectionLastChild, {
          x: 200,
          duration: 0.05,
          opacity: 0,
        });
      }
    }
    // shows the current step after the change btn click
    let currentSteps = document.querySelector(
      `#form-section-${currentSection} div section:nth-child(${currentStep})`
    );
    gsap.to(currentSteps, {
      x: 0,
      duration: 0.05,
      opacity: 1,
      visibility: "visible",
      delay: 0.03,
    });
  }, [currentStep]);

  // for when the change buttons are clicked next/prev
  const handleChangeBtn = (e) => {
    e.preventDefault();
    if (e.target.name == "next") {
      setChangeStepBtn("next");
      // if its the last step don't move anymore
      if (currentSection == sectionCount && currentStep == stepCount) {
        // wiggle.restart();
      } else {
        // move to the 'next' step
        if (stepCount != currentStep) {
          setCurrentStep(currentStep + 1);
        } else {
          setCurrentSection(currentSection + 1);
          // setCurrentStep(1);
        }
      }
    } else if (e.target.name == "prev") {
      setChangeStepBtn("prev");
      if (currentSection == 1 && currentStep == 1) {
      } else {
        if (currentStep != 1) {
          setCurrentStep(currentStep - 1);
        } else {
          setCurrentSection(currentSection - 1);
        }
      }
    }
  };

  const handleDotBtn = (btnId) => {
    let difference = Math.abs(btnId - currentStep);
    let currentSteps = document.querySelector(
      `#form-section-${currentSection} div section:nth-child(${currentStep})`
    );
    if (currentStep > btnId) {
      setChangeStepBtn("prev");
      for (let i = 1; i <= difference; i++) {
        gsap.to(currentSteps, {
          x: 200,
          duration: 0.05,
          opacity: 0,
          delay: 0.03,
        });
      }
    } else if (currentStep < btnId) {
      setChangeStepBtn("next");
      gsap.to(currentSteps, {
        x: 200,
        duration: 0.05,
        opacity: 0,
        delay: 0.03,
      });
    }
    setCurrentStep(btnId);
  };

  // sets the selected radio btn to the state
  const handleRadioInput = (e, radioGroupName) => {
    var radioInputs = document.querySelectorAll(
      `input[name="${radioGroupName}"]`
    );
    radioInputs.forEach((radioInput) => {
      if (radioInput.checked) {
        setMainPageType(e.target.value);
      }
    });
  };

  const handleLinks = (e) => {
    e.preventDefault();
    let input = document.getElementById(`input-${id}`);
    if (links.length <= 2) {
      setLinks(
        links.concat(
          <SmallTiles
            value={{ value: input.value, icon: icon, linkType: linkType }}
            key={links.length}
          ></SmallTiles>
        )
      );
    }
  };

  return (
    <section className="flex flex-col items-end gap-7 transition-all duration-300 ease-in-out">
      {/* form section title  */}
      <h1
        id="section-title"
        className="translate-x-[200px] text-end text-3xl font-black text-royale-green opacity-0"
      >
        {/* {title} */}
        {sectionTitle}
      </h1>
      {/* <div className="flex w-full bg-yellow-600 transition-all duration-300 ease-in-out"> */}
      <div id="form-wrapper" className="relative flex h-96 w-96 justify-center">
        <section
          id="form-section-1"
          className="absolute flex w-96 transition duration-200 ease-in-out"
        >
          <div className="relative">
            <FormStep>
              <FormTab
                title="لینک ها"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                input_type="text"
                id={1}
              >
                <ToggleBtn id={"links"}></ToggleBtn>
              </FormTab>
              <FormTab
                title="شماره تماس"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                id={2}
              >
                <ToggleBtn id={"phone-number"}></ToggleBtn>
              </FormTab>
              <FormTab
                title="موقعیت مکانی"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                id={3}
              >
                <ToggleBtn id={"location"}></ToggleBtn>
              </FormTab>
            </FormStep>
            <FormStep>
              <FormTab
                title="لینک ها"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                input_type="text"
                id={1}
              >
                <ToggleBtn id={"linkss"}></ToggleBtn>
              </FormTab>
              <FormTab
                title="شماره تماس"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                id={2}
              >
                <ToggleBtn id={"phone-number"}></ToggleBtn>
              </FormTab>
              <FormTab
                title="موقعیت مکانی"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                id={3}
              >
                <ToggleBtn id={"location"}></ToggleBtn>
              </FormTab>
            </FormStep>
          </div>
        </section>
        <section
          id="form-section-2"
          className="absolute flex h-min w-96 transition duration-200 ease-in-out"
        >
          <div className="relative">
            <FormStep>
              <FormTab
                title="لینک ها"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                input_type="text"
                id={1}
              >
                <ToggleBtn id={"links"}></ToggleBtn>
              </FormTab>
              <FormTab
                title="شماره تماس"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                id={2}
              >
                <ToggleBtn id={"phone-number"}></ToggleBtn>
              </FormTab>
              <FormTab
                title="موقعیت مکانی"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                id={3}
              >
                <ToggleBtn id={"location"}></ToggleBtn>
              </FormTab>
            </FormStep>
            <FormStep>
              <FormTab
                title="لینک ها"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                input_type="text"
                id={1}
              >
                <ToggleBtn id={"links"}></ToggleBtn>
              </FormTab>
              <FormTab
                title="شماره تماس"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                id={2}
              >
                <ToggleBtn id={"phone-number"}></ToggleBtn>
              </FormTab>
              <FormTab
                title="موقعیت مکانی"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                id={3}
              >
                <ToggleBtn id={"location"}></ToggleBtn>
              </FormTab>
            </FormStep>
            <FormStep>
              <FormTab
                title="تک بخشی"
                description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                icon_src="/images/single.svg"
                id={4}
              >
                <RadioBtn
                  name={"main_page_type"}
                  id={"single"}
                  value={"single"}
                  handler={handleRadioInput}
                ></RadioBtn>
              </FormTab>
              <FormTab
                title="چند بخشی"
                description="دارای بخش های جداگانه مانند: منو کافه و منو رستوران"
                icon_src="/images/single.svg"
                id={5}
              >
                <RadioBtn
                  name={"main_page_type"}
                  id={"double"}
                  value={"double"}
                  handler={handleRadioInput}
                ></RadioBtn>
              </FormTab>
              <FormTab
                title="بدون صفحه اصلی"
                description="کاربر با اسکن کد بلافاصله به صفحه آیتم ها هدایت میشود"
                icon_src="/images/single.svg"
                id={6}
              >
                <RadioBtn
                  name={"main_page_type"}
                  id={"none"}
                  value={"none"}
                  handler={handleRadioInput}
                ></RadioBtn>
              </FormTab>
            </FormStep>
          </div>
        </section>
      </div>
      {/* form navigation buttons  */}
      <footer className="flex w-full items-center justify-between">
        <button
          className="flex select-none items-center justify-between gap-1 rounded-full bg-royale-green px-6 py-2 text-sm font-normal text-sky-blue transition-all duration-200 ease-in-out hover:gap-4 active:scale-90"
          onClick={(e) => handleChangeBtn(e, currentSection)}
          name="prev"
        >
          قبلی
        </button>
        <div>
          <div className="flex w-min items-center justify-between gap-1 rounded-full bg-soft-blue p-1">
            {[...Array(stepCount)].map((e, i) => (
              <span
                onClick={() => handleDotBtn(i + 1)}
                className={`${
                  currentStep == i + 1
                    ? "border-royale-green bg-royale-green"
                    : "border-sad-blue bg-sad-blue"
                } border-1 h-3 w-3 cursor-pointer select-none rounded-full border-2 transition duration-200 ease-in-out hover:border-2 hover:border-royale-green hover:bg-sky-blue`}
              ></span>
            ))}
          </div>
        </div>
        <button
          className="flex select-none items-center justify-between gap-1 rounded-full bg-royale-green px-6 py-2 text-sm font-normal text-sky-blue transition-all duration-200 ease-in-out hover:gap-4 active:scale-90"
          onClick={(e) => handleChangeBtn(e, currentSection)}
          name="next"
        >
          بعدی
        </button>
      </footer>
      {/* currentSection:{currentSection}
      <br></br> sectionCount:{sectionCount}
      <br></br> currentStep:{currentStep}
      <br></br> stepCount:{stepCount} */}
    </section>
  );
}
