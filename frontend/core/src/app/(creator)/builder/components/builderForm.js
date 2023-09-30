"use client";

import { useState, useEffect, useRef, useContext, createContext } from "react";
import { NameGiverInput } from "@/app/components/inputs";
import { ToggleBtn, RadioBtn } from "@/app/components/buttons";
import Button from "@/app/components/Button";
import { gsap } from "gsap";
import Image from "next/image";

export const HeightContext = createContext(null);
export const FormDataContext = createContext(null);
const RadioGroupContext = createContext(null);

// function SmallTiles({ value }) {
//   return (
//     <div className="flex items-center justify-between gap-2 rounded-lg bg-sad-blue p-2">
//       {value.linkType}
//       {value.icon != "" ? (
//         <Image src={value.icon} width={24} height={24}></Image>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

export function FormTab({
  title,
  description,
  icon_src,
  btn_type = "",
  value = "",
  id = "",
  children,
}) {
  const formHeight = useContext(HeightContext);
  const radioBtnInfo = useContext(RadioGroupContext);
  const childrenSection = useRef(null);
  let formTab = document.getElementById(`form-tab-${id}`);

  // shows/hide formTab children
  const handleToggle = (btnStatus) => {
    if (btnStatus == 0) {
      formTab.style.borderColor = "#0F2C30";
      childrenSection.current.style.display = "flex";
    } else {
      formTab.style.borderColor = "#C5E5E9";
      childrenSection.current.style.display = "none";
    }
    formHeight();
  };

  // sets the selected radio btn to the state
  const handleRadioInput = (btnStatus) => {
    var radioGroup = document.querySelectorAll(`.${radioBtnInfo.group_name}`);
    let radioBtn = document.querySelector(`input[value=${value}]`);
    if (btnStatus) {
      radioGroup.forEach((formTab) => {
        formTab.style.borderColor = "#C5E5E9";
        formTab.lastChild.style.display = "none";
      });
      radioBtn.checked = btnStatus;
      formTab.style.borderColor = "#0F2C30";
      childrenSection.current.style.display = "flex";
      formHeight();
    }
  };

  return (
    <li
      id={`form-tab-${id}`}
      className={`${
        btn_type == "radio" && radioBtnInfo.group_name
      } duration-2000 flex w-96 select-none flex-col items-end justify-between gap-2 rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royale-green transition-all ease-in-out`}
    >
      <div
        onClick={btn_type == "radio" ? handleRadioInput : undefined}
        className="flex w-full items-center justify-between"
      >
        {/* tab button type  */}
        {btn_type == "toggle" ? (
          <ToggleBtn
            id={`toggle-btn-${id}`}
            action={(toggleStatus) => handleToggle(toggleStatus)}
          ></ToggleBtn>
        ) : btn_type == "radio" ? (
          <RadioBtn
            name={radioBtnInfo["group_name"]}
            id={`radio-btn-${id}`}
            value={value}
            action={(btnStatus) => handleRadioInput(btnStatus)}
          ></RadioBtn>
        ) : (
          ""
        )}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          {icon_src && (
            <Image
              src={icon_src}
              width={30}
              height={30}
              alt="section icon"
            ></Image>
          )}
        </div>
      </div>
      <p className="text-end font-normal">{description}</p>
      <section
        className={`hidden w-full ${!children ? "absolute" : ""}`}
        ref={childrenSection}
      >
        {children}
      </section>
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
  const [currentStep, setCurrentStep] = useState(1);
  const [stepCount, setStepCount] = useState(1);

  const [formHeight, setFormHeight] = useState("");
  // will change depending on which changeStepBtn has been clicked(next/prev)
  const [changeStepBtn, setChangeStepBtn] = useState("next");

  const [sectionTitle, setSectionTitle] = useState();

  const [formData, setFormData] = useState({
    main_page_type: "couple",
    menuSectionsCount: 1,
    single_menu_sections: [],
    couple_menu_sections: [
      { id: 1, icon: "5", name: "menu" },
      { id: 25, icon: "3", name: "burger" },
    ],
    links: [],
    phoneNumbers: [],
    locations: [],
    item_page_type: "horizenal",
  });

  //chnages the form height each time the formData changes
  useEffect(() => {
    changeFormHeight();
  }, [formData]);

  useEffect(() => {
    let formWrapper = document.getElementById("form-wrapper");

    // calculating sectionCount
    setSectionCount(formWrapper.childNodes.length);

    // changes the form height depending on the children
    formWrapper.style.height = `${formHeight}px`;
  }, [formHeight]);

  useEffect(() => {
    // calculate current section step count
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

  // changes form height to the size of current active step
  const changeFormHeight = () => {
    setFormHeight(currentStep.offsetHeight);
  };

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

  // const handleLinks = (e) => {
  //   e.preventDefault();
  //   let input = document.getElementById(`input-${id}`);
  //   if (links.length <= 2) {
  //     setLinks(
  //       links.concat(
  //         <SmallTiles
  //           value={{ value: input.value, icon: icon, linkType: linkType }}
  //           key={links.length}
  //         ></SmallTiles>
  //       )
  //     );
  //   }
  // };

  return (
    <section className="flex w-96 flex-col justify-center gap-7 transition-all duration-300 ease-in-out">
      <header>
        <h1
          id="section-title"
          className="translate-x-[200px] text-end text-3xl font-black text-royale-green opacity-0"
        >
          {sectionTitle}
        </h1>
      </header>
      <FormDataContext.Provider value={formData}>
        <div
          id="form-wrapper"
          className={`flex w-full transition-all duration-300 ease-in-out`}
        >
          <HeightContext.Provider value={changeFormHeight}>
            <FormSection id={1}>
              <FormStep>
                <RadioGroupContext.Provider
                  value={{ group_name: "main_page_type" }}
                >
                  <FormTab
                    title="تک بخشی"
                    description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                    icon_src="/images/form-icons/single.svg"
                    id={1}
                    btn_type="radio"
                    value="single"
                  >
                    <NameGiverInput
                      setFormData={setFormData}
                      name="single_menu_sections"
                      secondary_btn={{ name: "آیکون", toolTip: "prop2" }}
                      placeholder="نام بخش را در اینجا بنویسید"
                    ></NameGiverInput>
                  </FormTab>
                  <FormTab
                    title="چند بخشی"
                    description="دارای بخش های جداگانه مانند: منو کافه و منو رستوران"
                    icon_src="/images/form-icons/couple.svg"
                    id={2}
                    btn_type="radio"
                    value="couple"
                  >
                    <NameGiverInput
                      setFormData={setFormData}
                      name="couple_menu_sections"
                      secondary_btn={{ name: "آیکون", toolTip: "prop2" }}
                      placeholder="نام بخش را در اینجا بنویسید"
                    ></NameGiverInput>
                  </FormTab>
                  <FormTab
                    title="بدون صفحه اصلی"
                    description="کاربر با اسکن کد بلافاصله به صفحه آیتم ها هدایت میشود"
                    icon_src="/images/form-icons/none.svg"
                    id={3}
                    btn_type="radio"
                    value="none"
                  ></FormTab>
                </RadioGroupContext.Provider>
              </FormStep>
              <FormStep>
                <FormTab
                  title="لینک ها"
                  description="... لینک های تلگرام و اینستاگرام و"
                  icon_src="/images/form-icons/link.svg"
                  id={4}
                  btn_type="toggle"
                ></FormTab>
                <FormTab
                  title="شماره تماس"
                  description="نمایش شماره تماس کافه/رستوران"
                  icon_src="/images/form-icons/phone.svg"
                  id={5}
                  btn_type="toggle"
                ></FormTab>
                <FormTab
                  title="موقعیت مکانی"
                  description="نمایش آدرس و یا موقعت شما بر روی نقشه"
                  icon_src="/images/form-icons/pin.svg"
                  id={6}
                  btn_type="toggle"
                ></FormTab>
              </FormStep>
            </FormSection>
            <FormSection id={2}>
              <FormStep>
                <RadioGroupContext.Provider
                  value={{ group_name: "item_page_type" }}
                >
                  <FormTab
                    title="عمودی"
                    description="لیست آیتم ها به صورت عمودی نمایش داده میشود"
                    icon_src="/images/form-icons/vertical-menu-icon.svg"
                    btn_type="radio"
                    value="vertical"
                    id={10}
                  ></FormTab>
                  <FormTab
                    title="افقی"
                    description="لیست آیتم ها در بالای صفحه به صورت افقی نمایش داده میشود"
                    icon_src="/images/form-icons/horizenal-menu-icon.svg"
                    btn_type="radio"
                    value="horizenal"
                    id={11}
                  ></FormTab>
                </RadioGroupContext.Provider>
              </FormStep>
              <FormStep>
                <FormTab
                  title="لینک ها"
                  description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                  icon_src="/images/form-icons/single.svg"
                  id={10}
                ></FormTab>
                <FormTab
                  title="شماره تماس"
                  description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                  icon_src="/images/form-icons/single.svg"
                  id={11}
                ></FormTab>
                <FormTab
                  title="شماره تماس"
                  description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                  icon_src="/images/form-icons/single.svg"
                  id={11}
                ></FormTab>
                <FormTab
                  title="شماره تماس"
                  description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                  icon_src="/images/form-icons/single.svg"
                  id={11}
                ></FormTab>
              </FormStep>
              <FormStep>
                <FormTab
                  title="لینک ها"
                  description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                  icon_src="/images/form-icons/single.svg"
                  id={10}
                ></FormTab>
                <FormTab
                  title="شماره تماس"
                  description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                  icon_src="/images/form-icons/single.svg"
                  id={11}
                ></FormTab>
              </FormStep>
            </FormSection>
          </HeightContext.Provider>
        </div>
      </FormDataContext.Provider>

      <footer className="flex w-full items-center justify-between">
        <Button
          name="prev"
          variant="circular"
          content="قبلی"
          onClick={(e) => handleChangeBtn(e, currentSection)}
        ></Button>
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
        <Button
          name="next"
          variant="circular"
          content="بعدی"
          onClick={(e) => handleChangeBtn(e, currentSection)}
        ></Button>
      </footer>
    </section>
  );
}

// {formHeight}
/* currentSection:{currentSection}
<br></br> sectionCount:{sectionCount}
<br></br> currentStepNum:{currentStepNum}
<br></br> stepCount:{stepCount} */
