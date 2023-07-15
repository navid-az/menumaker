"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FormTabInput } from "@/app/components/inputs";
import { ToggleBtn, RadioBtn } from "@/app/components/buttons";

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
      className="flex w-96 cursor-pointer select-none flex-col items-end justify-between gap-2 overflow-hidden rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royale-green transition-all duration-500 ease-in-out"
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

export default function Form({ title }) {
  // const formTabWrapperRef = useRef(null);
  // const FormSectionRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(1);
  const [sectionCount, setSectionCount] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepCount, setStepCount] = useState(1);
  // will change depending on which changeStepBtn has been clicked(next/prev)
  const [changeStepBtn, setChangeStepBtn] = useState("next");

  const [mainPageType, setMainPageType] = useState("");
  const [links, setLinks] = useState([]);

  // calculating sectionCount
  useEffect(() => {
    let sectionCount = document.getElementById("form-wrapper");
    setSectionCount(sectionCount.childNodes.length);
  }, []);

  // calculate current section step count
  useEffect(() => {
    let stepsCount = document.getElementById(`form-section-${currentSection}`)
      .childNodes.length;
    setStepCount(stepsCount);
    if (changeStepBtn == "next") {
      setCurrentStep(1);
    } else if (changeStepBtn == "prev") {
      let stepCounts = document.getElementById(`form-section-${currentSection}`)
        .childNodes.length;
      setCurrentStep(stepCounts);
    }
  }, [currentSection]);

  useEffect(() => {
    // animating prev and next steps when the next/prev btn is clicked
    if (changeStepBtn == "next") {
      if (currentStep != 1) {
        let prevStep = document.querySelector(
          `#form-section-${currentSection} section:nth-child(${
            currentStep - 1
          })`
        );
        prevStep.style.background = "green";
      } else if (currentSection > 1 && currentStep == 1) {
        let prevSectionLastChild = document.querySelector(
          `#form-section-${currentSection - 1}`
        ).lastChild;
        prevSectionLastChild.style.background = "green";
      }
    } else if (changeStepBtn == "prev") {
      if (currentStep != stepCount) {
        let nextStep = document.querySelector(
          `#form-section-${currentSection} section:nth-child(${
            currentStep + 1
          })`
        );
        nextStep.style.background = "green";
      }
      if (currentSection < sectionCount && currentStep == stepCount) {
        let nextSectionLastChild = document.querySelector(
          `#form-section-${currentSection + 1}`
        ).firstChild;
        nextSectionLastChild.style.background = "green";
      }
    }
    // shows the current step after the change btn click
    let currentSteps = document.querySelector(
      `#form-section-${currentSection} section:nth-child(${currentStep})`
    );
    currentSteps.style.background = "purple";
  }, [currentStep]);

  /////////////// gsap wiggle

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
          // let stepCounts = document.getElementById(
          //   `form-section-${currentSection}`
          // ).childNodes.length;
          // setCurrentStep(stepCounts);
        }
      }
    }
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
    <section className="flex flex-col items-end gap-7 overflow-hidden transition-all duration-300 ease-in-out">
      {/* form section title  */}
      <h1 className="text-end text-3xl font-black text-royale-green">
        {title}
      </h1>
      <div className="flex transition-all duration-300 ease-in-out">
        {/* <FormSection title={"صفحه اصلی"}></FormSection> */}
        <div id="form-wrapper" className=" flex">
          <section
            id="form-section-1"
            className="flex bg-red-300 transition duration-200 ease-in-out"
          >
            <section
              className={
                "form-sections flex h-min w-96 flex-1 flex-col items-end justify-between gap-7"
              }
            >
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
            </section>
            <section
              className={
                "form-sections flex h-min w-96 flex-1 flex-col items-end justify-between gap-7"
              }
            >
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
            </section>
          </section>
          <section
            id="form-section-2"
            className="flex bg-red-600 transition duration-200 ease-in-out"
          >
            <section
              className={
                "form-sections flex h-min w-96 flex-1 flex-col items-end justify-between gap-7"
              }
            >
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
            </section>
            <section
              className={
                "form-sections flex h-min w-96 flex-1 flex-col items-end justify-between gap-7"
              }
            >
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
            </section>
            <section
              className={
                "form-sections flex h-min w-96 flex-1 flex-col items-end justify-between gap-7"
              }
            >
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
            </section>
          </section>
          <section
            id="form-section-3"
            className="flex bg-red-200 transition duration-200 ease-in-out"
          >
            <section
              className={
                "form-sections flex h-min w-96 flex-1 flex-col items-end justify-between gap-7"
              }
            >
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
            </section>
            <section
              className={
                "form-sections flex h-min w-96 flex-1 flex-col items-end justify-between gap-7"
              }
            >
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
            </section>
            <section
              className={
                "form-sections flex h-min w-96 flex-1 flex-col items-end justify-between gap-7"
              }
            >
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
            </section>
          </section>
        </div>
      </div>
      {/* form navigation buttons  */}
      <footer className="flex w-full items-center justify-center">
        <button
          className="select-none duration-400 flex items-center justify-between gap-1 rounded-full bg-royale-green px-6 py-2 text-sm font-normal text-sky-blue transition-all ease-in-out hover:gap-4 active:scale-90"
          onClick={(e) => handleChangeBtn(e, currentSection)}
          name="prev"
        >
          قبلی
        </button>
        <div>
          currentSection:{currentSection}
          <br></br> sectionCount:{sectionCount}
          <br></br> currentStep:{currentStep}
          <br></br> stepCount:{stepCount}
          <div className="flex w-min items-center justify-between gap-1 rounded-full bg-soft-blue p-1">
            {[...Array(stepCount)].map((e, i) => (
              <span className="border-1 h-3 w-3 select-none rounded-full border-2 border-sad-blue bg-sad-blue transition duration-200 ease-in-out hover:border-2 hover:border-royale-green hover:bg-sky-blue"></span>
            ))}
          </div>
        </div>
        <button
          className="duration-400 flex select-none items-center justify-between gap-1 rounded-full bg-royale-green px-6 py-2 text-sm font-normal text-sky-blue transition-all ease-in-out hover:gap-4 active:scale-90"
          onClick={(e) => handleChangeBtn(e, currentSection)}
          name="next"
        >
          بعدی
        </button>
      </footer>
    </section>
  );
}
