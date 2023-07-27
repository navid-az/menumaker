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
  return (
    <li
      id={`form-tab-${id}`}
      ref={tabRef}
      className="duration-2000 flex w-96 select-none flex-col items-end justify-between gap-2 rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royale-green transition-all ease-in-out"
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
      {input_type == "text" && <FormTabInput id={id}></FormTabInput>}
      <div className="hidden">
        hello <br /> <br />
        broooo
      </div>
    </li>
  );
}

export function FormSection({ children, id }) {
  return (
    <section
      id={`form-section-${id}`}
      className={"relative transition duration-200 ease-in-out"}
    >
      {children}
    </section>
  );
}

export function FormStep({ children }) {
  return (
    <ul
      className={
        "pointer-events-none absolute flex translate-x-[200px] flex-col justify-between gap-7 opacity-0 transition duration-200 ease-in-out"
      }
    >
      {children}
    </ul>
  );
}

export default function Form() {
  const [currentSection, setCurrentSection] = useState(1);

  const [sectionCount, setSectionCount] = useState(1);
  const [currentStepNum, setCurrentStepNum] = useState(1);
  const [currentStep, setCurrentStep] = useState();
  const [stepCount, setStepCount] = useState(1);

  const [formHeight, setFormHeight] = useState("");
  // will change depending on which changeStepBtn has been clicked(next/prev)
  const [changeStepBtn, setChangeStepBtn] = useState("next");

  let titles = ["صفحه اصلی", "صفحه آیتم ها", "صفحه سفارشات"];
  const [sectionTitle, setSectionTitle] = useState();

  const [mainPageType, setMainPageType] = useState(titles[0]);
  const [links, setLinks] = useState([]);

  const [formData, setFormData] = useState({
    //main page
    mainPageType: null,
    sectionOneName: "",
    sectionTwoName: "",
    //items page
  });

  // calculating sectionCount
  useEffect(() => {
    let sectionCount = document.getElementById("form-wrapper");
    setSectionCount(sectionCount.childNodes.length);
  }, []);

  // calculate current section step count
  useEffect(() => {
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
    let currentSectionTitle = document.getElementById("section-title");
    gsap.to(currentSectionTitle, { x: 200, duration: 0.25, opacity: 0 });
    setSectionTitle(titles[currentSection - 1]);
    gsap.to(currentSectionTitle, { x: 0, duration: 0.25, opacity: 1 });
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
    let currentSteps = document.querySelector(
      `#form-section-${currentSection} ul:nth-child(${currentStepNum})`
    );
    setCurrentStep(currentSteps);

    setFormHeight(currentSteps.offsetHeight);

    gsap.to(currentSteps, {
      x: 0,
      duration: 0.05,
      opacity: 1,
      pointerEvents: "auto",
      delay: 0.03,
    });
  }, [currentStepNum]);

  useEffect(() => {
    let formWrapper = document.getElementById("form-wrapper");
    formWrapper.style.height = `${formHeight}px`;
  }, [formHeight]);

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

  const handleToggle = (data, parentId) => {
    let tab = document.getElementById(`form-tab-${parentId}`);

    if (data == 0) {
      tab.style.borderColor = "#0F2C30";
      tab.lastChild.style.display = "flex";
    } else {
      tab.style.borderColor = "#C5E5E9";
      tab.lastChild.style.display = "none";
    }
    setFormHeight(currentStep.offsetHeight);
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
    <section className="flex w-96 flex-col justify-center gap-7 transition-all duration-300 ease-in-out">
      <header>
        {/* section title  */}
        <h1
          id="section-title"
          className="translate-x-[200px] text-end text-3xl font-black text-royale-green opacity-0"
        >
          {sectionTitle}
        </h1>
      </header>
      <div
        id="form-wrapper"
        className={`flex w-full transition-all duration-300 ease-in-out`}
      >
        <FormSection id={1}>
          <FormStep>
            <FormTab
              title="تک بخشی"
              description="دارای یک دکمه اصلی برای ورود به صفحه منو"
              icon_src="/images/form-icons/single.svg"
              id={1}
            >
              <RadioBtn
                name={"main_page_type"}
                id={"single"}
                value={"single"}
                handler={() => handleRadioInput(1)}
              ></RadioBtn>
            </FormTab>
            <FormTab
              title="چند بخشی"
              description="دارای بخش های جداگانه مانند: منو کافه و منو رستوران"
              icon_src="/images/form-icons/couple.svg"
              id={2}
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
              icon_src="/images/form-icons/none.svg"
              id={3}
            >
              <RadioBtn
                name={"main_page_type"}
                id={"none"}
                value={"none"}
                handler={handleRadioInput}
              ></RadioBtn>
            </FormTab>
          </FormStep>
          <FormStep>
            <FormTab
              title="لینک ها"
              description="... لینک های تلگرام و اینستاگرام و"
              icon_src="/images/form-icons/link.svg"
              id={4}
            >
              <ToggleBtn
                id={"links"}
                action={(toggleStatus) => handleToggle(toggleStatus, 4)}
              ></ToggleBtn>
            </FormTab>
            <FormTab
              title="شماره تماس"
              description="نمایش شماره تماس کافه/رستوران"
              icon_src="/images/form-icons/phone.svg"
              id={5}
            >
              <ToggleBtn
                id={"phone-number"}
                action={(toggleStatus) => handleToggle(toggleStatus, 5)}
              ></ToggleBtn>
            </FormTab>
            <FormTab
              title="موقعیت مکانی"
              description="نمایش آدرس و یا موقعت شما بر روی نقشه"
              icon_src="/images/form-icons/pin.svg"
              id={6}
            >
              <ToggleBtn id={"location"}></ToggleBtn>
            </FormTab>
          </FormStep>
        </FormSection>
        <FormSection id={2}>
          <FormStep>
            <FormTab
              title="لینک ها"
              description="دارای یک دکمه اصلی برای ورود به صفحه منو"
              icon_src="/images/single.svg"
              input_type="text"
              id={10}
            >
              <ToggleBtn id={"random"}></ToggleBtn>
            </FormTab>
            <FormTab
              title="شماره تماس"
              description="دارای یک دکمه اصلی برای ورود به صفحه منو"
              icon_src="/images/single.svg"
              id={11}
            >
              <ToggleBtn id={"random2"}></ToggleBtn>
            </FormTab>
          </FormStep>
          <FormStep>
            <FormTab
              title="لینک ها"
              description="دارای یک دکمه اصلی برای ورود به صفحه منو"
              icon_src="/images/single.svg"
              input_type="text"
              id={10}
            >
              <ToggleBtn id={"random"}></ToggleBtn>
            </FormTab>
            <FormTab
              title="شماره تماس"
              description="دارای یک دکمه اصلی برای ورود به صفحه منو"
              icon_src="/images/single.svg"
              id={11}
            >
              <ToggleBtn id={"random2"}></ToggleBtn>
            </FormTab>
            <FormTab
              title="شماره تماس"
              description="دارای یک دکمه اصلی برای ورود به صفحه منو"
              icon_src="/images/single.svg"
              id={11}
            >
              <ToggleBtn id={"random2"}></ToggleBtn>
            </FormTab>
            <FormTab
              title="شماره تماس"
              description="دارای یک دکمه اصلی برای ورود به صفحه منو"
              icon_src="/images/single.svg"
              id={11}
            >
              <ToggleBtn id={"random2"}></ToggleBtn>
            </FormTab>
          </FormStep>
          <FormStep>
            <FormTab
              title="لینک ها"
              description="دارای یک دکمه اصلی برای ورود به صفحه منو"
              icon_src="/images/single.svg"
              input_type="text"
              id={10}
            >
              <ToggleBtn id={"random"}></ToggleBtn>
            </FormTab>
            <FormTab
              title="شماره تماس"
              description="دارای یک دکمه اصلی برای ورود به صفحه منو"
              icon_src="/images/single.svg"
              id={11}
            >
              <ToggleBtn id={"random2"}></ToggleBtn>
            </FormTab>
          </FormStep>
        </FormSection>
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
        <div className="flex w-min items-center justify-between gap-1 rounded-full bg-soft-blue p-2">
          {[...Array(stepCount)].map((e, i) => (
            <span
              onClick={() => handleDotBtn(i + 1)}
              className={`${
                currentStepNum == i + 1
                  ? "border-royale-green bg-royale-green"
                  : "border-sad-blue bg-sad-blue"
              } border-1 h-3 w-3 cursor-pointer select-none rounded-full border-2 transition duration-200 ease-in-out hover:border-2 hover:border-royale-green hover:bg-sky-blue`}
            ></span>
          ))}
        </div>
        <button
          className="flex select-none items-center justify-between gap-1 rounded-full bg-royale-green px-6 py-2 text-sm font-normal text-sky-blue transition-all duration-200 ease-in-out hover:gap-4 active:scale-90"
          onClick={(e) => handleChangeBtn(e, currentSection)}
          name="next"
        >
          بعدی
        </button>
      </footer>
    </section>
  );
}

// {formHeight}
/* currentSection:{currentSection}
<br></br> sectionCount:{sectionCount}
<br></br> currentStepNum:{currentStepNum}
<br></br> stepCount:{stepCount} */
