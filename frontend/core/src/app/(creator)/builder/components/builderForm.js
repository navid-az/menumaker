"use client";

import { useState, useEffect, useRef, useContext, createContext } from "react";
import { NameGiverInput } from "@/app/components/inputs";
import { ToggleBtn, RadioBtn } from "@/app/components/buttons";
import Image from "next/image";
import StepNavigator from "./StepNavigator";

export const HeightContext = createContext(null);
export const FormDataContext = createContext(null);
const RadioGroupContext = createContext(null);

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

  // handles both toggle and radio buttons
  const handleBtn = (btnType, btnStatus) => {
    if (btnType == "toggle") {
      if (btnStatus == 0) {
        formTab.style.borderColor = "#0F2C30";
        childrenSection.current.style.display = "flex";
      } else {
        formTab.style.borderColor = "#C5E5E9";
        childrenSection.current.style.display = "none";
      }
    } else if (btnType == "radio") {
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
    }
  };

  return (
    <li
      onClick={
        btn_type == "radio"
          ? (btnStatus) => handleBtn(btn_type, btnStatus)
          : undefined
      }
      id={`form-tab-${id}`}
      className={`${
        btn_type == "radio" && radioBtnInfo.group_name
      } duration-2000 flex w-96 cursor-pointer select-none flex-col items-end justify-between gap-2 rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royal-green transition-all ease-in-out`}
    >
      <div className="flex w-full items-center justify-between">
        {/* tab button type  */}
        {btn_type == "toggle" ? (
          <ToggleBtn
            id={`toggle-btn-${id}`}
            action={(btnStatus) => handleBtn(btn_type, btnStatus)}
          ></ToggleBtn>
        ) : btn_type == "radio" ? (
          <RadioBtn
            name={radioBtnInfo["group_name"]}
            id={`radio-btn-${id}`}
            value={value}
            action={(btnStatus) => handleBtn(btn_type, btnStatus)}
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
        className={`hidden w-full ${!children && "absolute"}`}
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
  const [activeStep, setActiveStep] = useState(null);

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formHeight, setFormHeight] = useState("");
  const [sectionTitle, setSectionTitle] = useState();

  // user's form data
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

    // changes the form height depending on the children
    formWrapper.style.height = `${formHeight}px`;
  }, [formHeight]);

  // changes form height to the size of current active step
  const changeFormHeight = () => {
    setFormHeight(currentStep.offsetHeight);
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
          className="translate-x-[200px] text-end text-3xl font-black text-royal-green opacity-0"
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
        <StepNavigator
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setFormHeight={setFormHeight}
          setSectionTitle={setSectionTitle}
        ></StepNavigator>
      </footer>
    </section>
  );
}

// {formHeight}
/* currentSection:{currentSection}
<br></br> sectionCount:{sectionCount}
<br></br> currentStepNum:{currentStepNum}
<br></br> stepCount:{stepCount} */
