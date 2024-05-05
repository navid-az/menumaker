"use client";

import React, { forwardRef } from "react";
import { useState, useEffect, useRef, useContext, createContext } from "react";
import Image from "next/image";

//components
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// import { ToggleBtn, RadioBtn } from "@/components/global/buttons";
import StepNavigator from "./StepNavigator";
import { NameGiverInput } from "@/components/global/inputs";
import ItemAdder from "@/components/global/ItemAdder";
import FormTab from "./FormTab";
import Selector from "@/components/global/selector";

export const HeightContext = createContext<Function | null>(null);
export const FormDataContext = createContext<object | null>(null);
const RadioGroupContext = createContext<object | null>(null);

type formTabType = {
  title: string;
  description: string;
  icon_src: string;
  btn_type?: string;
  id: number;
  value?: string;
  children?: React.ReactNode;
};

// export function FormTab({
//   title,
//   description,
//   icon_src,
//   btn_type,
//   value,
//   id,
//   children,
// }: formTabType) {
//   const formHeight = useContext(HeightContext);
//   const radioBtnInfo = useContext(RadioGroupContext);
//   const childrenSection = useRef(null);
//   // let formTab = document.getElementById(`form-tab-${id}`);

//   const switchRef = useRef<HTMLLIElement>(null);
//   const formTabRef = useRef<HTMLLIElement>(null);

//   // handles both toggle and radio buttons
//   // const handleBtn = (btnType: string, btnStatus: number) => {
//   //   if (btnType == "toggle") {
//   //     if (btnStatus == 0) {
//   //       formTabRef.current.style.borderColor = "#0F2C30";
//   //       childrenSection.current.style.display = "flex";
//   //     } else {
//   //       formTab.style.borderColor = "#C5E5E9";
//   //       childrenSection.current.style.display = "none";
//   //     }
//   //   } else if (btnType == "radio") {
//   //     var radioGroup = document.querySelectorAll(`.${radioBtnInfo.group_name}`);
//   //     let radioBtn = document.querySelector(`input[value=${value}]`);
//   //     if (btnStatus) {
//   //       radioGroup.forEach((formTab) => {
//   //         formTab.style.borderColor = "#C5E5E9";
//   //         formTab.lastChild.style.display = "none";
//   //       });
//   //       radioBtn.checked = btnStatus;
//   //       formTab.style.borderColor = "#0F2C30";
//   //       childrenSection.current.style.display = "flex";
//   //       formHeight();
//   //     }
//   //   }
//   // };

//   const handleSwitch = () => {
//     const toggle = switchRef.current;
//     const formTab = formTabRef.current;
//     if (toggle && formTab) {
//       if (toggle.dataset.state === "checked") {
//         formTab.style.borderColor = "#C5E5E9";
//       } else {
//         formTab.style.borderColor = "#0F2C30";
//       }
//     }
//   };

//   return (
//     <li
//       // onClick={
//       //   btn_type == "radio"
//       //     ? (btnStatus) => handleBtn(btn_type, btnStatus)
//       //     : undefined
//       // }
//       ref={formTabRef}
//       id={`form-tab-${id}`}
//       // ${
//       //   btn_type == "radio" && radioBtnInfo.group_name
//       // }
//       className={` duration-2000 flex w-full cursor-pointer select-none flex-col items-end justify-between gap-2 rounded-lg border-[3px] border-sad-blue bg-soft-blue p-2 text-royal-green transition-all ease-in-out sm:p-3`}
//     >
//       <Label
//         htmlFor={`toggle-btn-${id}`}
//         className="flex w-full items-center justify-between"
//       >
//         {/* tab button type  */}
//         {btn_type == "toggle" ? (
//           <Switch id={`toggle-btn-${id}`}></Switch>
//         ) : btn_type == "radio" ? (
//           <RadioBtn
//             name={"bro"}
//             id={`radio-btn-${id}`}
//             value={value}
//             // action={(btnStatus) => handleBtn(btn_type, btnStatus)}
//           ></RadioBtn>
//         ) : (
//           ""
//         )}
//         <div className="flex items-center justify-between gap-2">
//           <h3 className="text-lg font-bold sm:text-2xl">{title}</h3>
//           {icon_src && (
//             <div className="relative aspect-square w-6 sm:w-7">
//               <Image src={icon_src} fill={true} alt="section icon"></Image>
//             </div>
//           )}
//         </div>
//       </Label>

//       <p className="text-end text-sm font-normal sm:text-base">{description}</p>
//       <section
//         className={`hidden w-full ${!children && "absolute"}`}
//         ref={childrenSection}
//       >
//         {children}
//       </section>
//     </li>
//   );
// }

export function FormSection({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) {
  return (
    <section
      id={`form-section-${id}`}
      // relative
      className={"absolute w-full transition duration-200 ease-in-out"}
    >
      {children}
    </section>
  );
}

type FormStepProps = {
  children: React.ReactNode;
  id: string;
};

const FormStep = forwardRef<HTMLUListElement, FormStepProps>(
  function forwardRef({ children, id }: FormStepProps, ref) {
    const [activeStep, setActiveStep] = useState(null);
    return (
      <ul
        id={`form-step-${id}`}
        ref={ref}
        className={
          "pointer-events-none absolute flex w-full translate-x-[200px] flex-col justify-between gap-4 opacity-0 transition duration-200 ease-in-out sm:gap-7"
        }
      >
        {children}
      </ul>
    );
  }
);

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
    links_active: false,
    links: [],
    phoneNumbers_active: false,
    phoneNumbers: [],
    locations_active: false,
    locations: [],
    item_page_type: "horizontal", // was horizenal
  });

  const formWrapperRef = useRef<HTMLDivElement>(null);

  //chnages the form height each time the formData changes
  // useEffect(() => {
  //   changeFormHeight();
  // }, [formData]);

  useEffect(() => {
    // let formWrapper = document.getElementById("form-wrapper");
    const formWrapper = formWrapperRef.current;
    // changes the form height depending on the children
    if (formWrapper) {
      formWrapper.style.height = `${formHeight}px`;
    }
  }, [formHeight]);

  // changes form height to the size of current active step
  // const changeFormHeight = () => {
  //   setFormHeight(currentStep.offsetHeight);
  // };

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
  const formStepRef = useRef<HTMLUListElement>(null);

  return (
    // w-96
    <section className="container flex w-screen flex-col justify-center gap-4 p-2 transition-all duration-300 ease-in-out xs:px-4 x:px-12 sm:gap-7">
      <header className="w-full">
        <h1
          id="section-title"
          className="translate-x-[200px] text-xl font-black text-royal-green opacity-0 sm:text-3xl"
        >
          {sectionTitle}
        </h1>
      </header>
      <FormDataContext.Provider value={formData}>
        <div
          ref={formWrapperRef}
          id="form-wrapper"
          className={`relative flex h-full w-full transition-all duration-300 ease-in-out`}
        >
          {/* <HeightContext.Provider value={changeFormHeight}> */}
          <FormSection id={1}>
            <FormStep id="1">
              <RadioGroupContext.Provider
                value={{ group_name: "main_page_type" }}
              >
                <FormTab
                  title="تک بخشی"
                  description="دارای یک دکمه اصلی برای ورود به صفحه منو"
                  icon="/images/form-icons/single.svg"
                  id="1"
                  button={{ type: "radioBtn", value: "niga" }}
                  // value="single"
                >
                  <ItemAdder
                    placeholder="نام بخش را در اینجا بنویسید"
                    name="icon"
                  ></ItemAdder>
                </FormTab>
                <FormTab
                  title="چند بخشی"
                  description="دارای بخش های جداگانه مانند: منو کافه و منو رستوران"
                  icon="/images/form-icons/couple.svg"
                  id="2"
                  button={{ type: "radioBtn", value: "niga" }}
                  // value="couple"
                >
                  <ItemAdder
                    placeholder="نام بخش را در اینجا بنویسید"
                    name="icon"
                  ></ItemAdder>
                </FormTab>
                <FormTab
                  title="بدون صفحه اصلی"
                  description="کاربر با اسکن کد بلافاصله به صفحه آیتم ها هدایت میشود"
                  icon="/images/form-icons/none.svg"
                  id="3"
                  button={{ type: "radioBtn", value: "niga" }}
                  // value="none"
                >
                  bitch!
                </FormTab>
              </RadioGroupContext.Provider>
            </FormStep>
            <FormStep id="2">
              <FormTab
                title="لینک ها"
                description="... لینک های تلگرام و اینستاگرام و"
                icon="/images/form-icons/link.svg"
                id="4"
                button={{ type: "switch", value: "links" }}
              >
                hello
              </FormTab>
              <FormTab
                title="شماره تماس"
                description="نمایش شماره تماس کافه/رستوران"
                icon="/images/form-icons/link.svg"
                id="5"
                button={{ type: "switch", value: "phoneNumbers" }}
              >
                nigga
              </FormTab>
              <FormTab
                title="موقعیت مکانی"
                description="نمایش آدرس و یا موقعت شما بر روی نقشه"
                icon="/images/form-icons/link.svg"
                id="6"
                button={{ type: "switch", value: "locations" }}
              >
                giga
              </FormTab>
            </FormStep>
          </FormSection>
          {/* <FormSection id={2}>
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
          </FormSection> */}
          {/* </HeightContext.Provider> */}
        </div>
      </FormDataContext.Provider>

      <StepNavigator
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setFormHeight={setFormHeight}
        setSectionTitle={setSectionTitle}
      ></StepNavigator>
    </section>
  );
}

// {formHeight}
/* currentSection:{currentSection}
<br></br> sectionCount:{sectionCount}
<br></br> currentStepNum:{currentStepNum}
<br></br> stepCount:{stepCount} */
