"use client";

import Image from "next/image";
import { useState, useEffect, useRef, cloneElement, Children } from "react";

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

function FormTabInput({ id, action }) {
  const [value, setValue] = useState("");
  const [links, setLinks] = useState([]);
  // set icon of the input depending on the value
  let icon = "";
  let linkType = "";
  if (value.includes("instagram.com")) {
    icon = "/images/instagram.svg";
    linkType = "اینستاگرام";
  } else if (value.includes("t.me")) {
    icon = "/images/telegram.svg";
    linkType = "تلگرام";
  }

  return (
    <>
      <div className="flex h-11 w-full items-end gap-2 rounded-lg bg-sad-blue p-2 text-end text-xs">
        <button
          onClick={(e) => action(e)}
          className="flex h-full w-auto flex-grow items-center justify-center rounded-md bg-royale-green text-center font-bold text-sky-blue"
        >
          ثبت
        </button>
        <input
          name="link-input"
          className="h-full w-3/5 flex-grow bg-sad-blue text-end placeholder:text-royale-green-dark focus:outline-0"
          placeholder="لینک را در اینجا کپی کنید"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={`input-${id}`}
        />
        {icon == "" ? (
          ""
        ) : (
          <Image
            className="flex h-full items-center"
            src={icon}
            width={18}
            height={18}
            alt="link icon"
          ></Image>
        )}
      </div>
      {links.length > 0 ? (
        <div className="grid w-full grid-flow-row grid-cols-2 grid-rows-2 justify-start gap-2">
          {links}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

// export const ToggleBtn = ({ onClick, toggle, isCheckbox }) => {
//   return (
//     <button
//       onClick={(e) => onClick(e)}
//       className={`flex h-7 w-14 items-center rounded-full border-2 border-royale-green p-1 shadow-inner transition-colors duration-300 ease-in-out ${
//         toggle == false ? "bg-none" : "bg-royale-green"
//       }`}
//     >
//       <span
//         className={`circle h-4 w-4 translate-x-0 rounded-full bg-royale-green transition-transform duration-300 ease-in-out ${
//           toggle == false
//             ? "translate-x-0 bg-royale-green"
//             : " translate-x-7 bg-sky-blue"
//         }`}
//       ></span>
//       {isCheckbox ? (
//         <input
//           type="checkbox"
//           name={`toggle-${isCheckbox.id}`}
//           id={`toggle-${isCheckbox.id}`}
//           value={isCheckbox.value}
//           checked={isCheckbox.isChecked}
//         />
//       ) : (
//         ""
//       )}
//     </button>
//   );
// };
export function ToggleBtn({ id, action }) {
  const [toggleStatus, setToggleStatus] = useState(0);
  const handleToggle = () => {
    var toggleSwitch = document.querySelector(`label>div[id=${id}]`);
    var toggleBg = document.querySelector(`label[for=${id}]`);

    if (toggleStatus == 0) {
      toggleSwitch.style.left = "30px";
      toggleBg.style.background = "#0F2C30";
      toggleSwitch.style.background = "#94D9E2";
      action(toggleStatus);
      setToggleStatus(1);
    } else {
      toggleSwitch.style.left = "3px";
      toggleBg.style.background = "none";
      toggleSwitch.style.background = "#0F2C30";
      action(toggleStatus);
      setToggleStatus(0);
    }
  };
  return (
    <>
      <input className="hidden" type="checkbox" id={id} />
      <label
        className="relative flex h-7 w-14 cursor-pointer items-center rounded-full border-2 border-royale-green bg-none transition-all duration-200 ease-in-out "
        for={id}
        onClick={handleToggle}
      >
        <div
          id={id}
          className="absolute left-[3px] h-5 w-5 rounded-full bg-royale-green transition-all duration-200 content-none"
        ></div>
      </label>
    </>
  );
}
// export function RadioBtnGroup({ children, name = "" }) {
//   const renderChildren = () => {
//     return Children.map(children, (child) => {
//       return cloneElement(child, {
//         name: name,
//       });
//     });
//   };
//   return <>{renderChildren()}</>;
// }

export function RadioBtn({ id, name, value, handler }) {
  return (
    <>
      <input
        className="m-0 grid h-7 w-7 appearance-none place-content-center rounded-full border-2 border-solid border-royale-green content-none before:h-5 before:w-5 before:scale-0 before:rounded-full before:bg-royale-green before:transition-transform before:duration-200 before:ease-in-out checked:before:scale-100"
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={(e) => handler(e, name)}
      />
    </>
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
  //toggle btn action function
  const handleToggle = (toggleStatus) => {
    var formTab = document.getElementById(`form-tab-${id}`);
    if (toggleStatus == 1) {
      formTab.style.minHeight = "92.8px";
    } else {
      formTab.style.minHeight = "40px";
    }
  };
  const renderChildren = () => {
    return Children.map(children, (child) => {
      return cloneElement(child, {
        action: handleToggle,
      });
    });
  };
  // const [radio, setRadio] = useState(0);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (btn == false) {
  //     tabRef.current.style.maxHeight = "450px";
  //     setBtn(true);
  //   } else {
  //     tabRef.current.style.maxHeight = "96px";
  //     setBtn(false);
  //   }
  // };

  return (
    <li
      id={`form-tab-${id}`}
      ref={tabRef}
      className="flex w-96 cursor-pointer flex-col items-end justify-between gap-2 overflow-hidden rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royale-green transition-all duration-500 ease-in-out"
    >
      <div className="flex w-full items-center justify-between">
        {renderChildren()}
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

export function FormSection({ children, id }) {
  return (
    <section
      id={`form-section-${id}`}
      className={
        "form-sections flex h-min flex-1 flex-col items-end justify-between gap-7"
      }
    >
      {children}
    </section>
  );
}

export default function Form({ title }) {
  // form input values
  const [mainPageType, setMainPageType] = useState("");
  const [links, setLinks] = useState([]);
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

  //
  const formTabWrapperRef = useRef(null);
  const [widthAmount, setWidthAmount] = useState(0);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    const tabCount = formTabWrapperRef.current.childNodes.length;
    setWidthAmount(100 / tabCount);
    setCounts(100 / tabCount);
  }, []);
  const handleNextBtn = (e) => {
    e.preventDefault();
    if (widthAmount < 100) {
      formTabWrapperRef.current.style.transform = `translateX(calc(${widthAmount}%))`;
      setWidthAmount(widthAmount + counts);
    }
  };
  const handlePrevBtn = (e) => {
    e.preventDefault();
    if (widthAmount >= 0) {
      formTabWrapperRef.current.style.transform = `translateX(calc(-${widthAmount}%))`;
      setWidthAmount(widthAmount - counts);
    }
  };
  return (
    <section className="flex w-96 flex-col items-end gap-7 overflow-hidden transition-all duration-300 ease-in-out">
      <h1 className="text-3xl font-black text-royale-green">{title}</h1>
      <div
        ref={formTabWrapperRef}
        className="flex transition-all duration-300 ease-in-out"
      >
        <FormSection title="صفحه اصلی" id={1}>
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
        </FormSection>
        <FormSection title="صفحه اصلی" id={2}>
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
        </FormSection>
      </div>
      <footer className="flex w-full items-center justify-between">
        <button onClick={(e) => handlePrevBtn(e)}>قبلی</button>
        <div>number of tabs</div>
        <button onClick={(e) => handleNextBtn(e)}>بعدی</button>
      </footer>
    </section>
  );
}
