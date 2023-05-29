"use client";

import Image from "next/image";
import { useState, useRef, forwardRef } from "react";

function FormTabInput() {
  const [value, setValue] = useState("");
  let icon = "";
  if (value.includes("instagram.com")) {
    icon = "/images/instagram.svg";
  } else if (value.includes("t.me")) {
    icon = "/images/telegram.svg";
  }
  return (
    <div className="flex h-11 w-full items-end gap-2 rounded-lg bg-sad-blue p-2 text-end text-xs">
      <button className="flex h-full w-auto flex-grow items-center justify-center rounded-md bg-royale-green text-center font-bold text-sky-blue">
        ثبت
      </button>
      <input
        className="h-full w-3/5 flex-grow bg-sad-blue text-end placeholder:text-royale-green-dark focus:outline-0"
        placeholder="لینک را در اینجا کپی کنید"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
  );
}

const ToggleBtn = forwardRef(({ onClick, toggle, isCheckbox }) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      className={`flex h-7 w-14 items-center rounded-full border-2 border-royale-green p-1 shadow-inner transition-colors duration-300 ease-in-out ${
        toggle == false ? "bg-none" : "bg-royale-green"
      }`}
    >
      <span
        className={`circle h-4 w-4 translate-x-0 rounded-full bg-royale-green transition-transform duration-300 ease-in-out ${
          toggle == false
            ? "translate-x-0 bg-royale-green"
            : " translate-x-7 bg-sky-blue"
        }`}
      ></span>
      {isCheckbox ? (
        <input
          type="checkbox"
          name={`toggle-${isCheckbox.id}`}
          id={`toggle-${isCheckbox.id}`}
          value={isCheckbox.value}
          checked={isCheckbox.isChecked}
        />
      ) : (
        ""
      )}
    </button>
  );
});

function RadioBtn() {
  const handleRadioBtn = (e) => {
    e.preventDefault();

    let yes = document.getElementById("yes");
    console.log(yes);
    yes.style.transform = "scale(1)";
  };
  return (
    <button
      onClick={(e) => handleRadioBtn(e)}
      className="flex items-center justify-center rounded-full border-2 border-royale-green p-1"
    >
      <span
        className=" h-4 w-4 scale-0 rounded-full bg-royale-green transition duration-500 ease-in-out"
        id="yes"
      ></span>
    </button>
  );
}

export function FormTab({
  title,
  description,
  icon_src,
  type = "radio",
  input_type = "",
  id = {},
}) {
  const tabRef = useRef(null);
  const [btn, setBtn] = useState(false);
  const [radio, setRadio] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    if (btn == false) {
      tabRef.current.style.maxHeight = "450px";
      setBtn(true);
    } else {
      tabRef.current.style.maxHeight = "96px";
      setBtn(false);
    }
  };
  const handleRadio = (e) => {
    e.preventDefault();
  };

  return (
    <li
      ref={tabRef}
      className="flex max-h-24 w-96 cursor-pointer flex-col items-end gap-2 overflow-hidden rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royale-green transition-all duration-500 ease-in-out"
    >
      <div className="flex w-full items-center justify-between">
        {type == "toggle" ? (
          <ToggleBtn onClick={handleClick} toggle={btn}></ToggleBtn>
        ) : type == "radio" ? (
          <RadioBtn onClick={handleRadio}></RadioBtn>
        ) : (
          <Image
            src="/images/locked.svg"
            width={20}
            height={20}
            alt="locked"
          ></Image>
        )}
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
      {input_type == "text" ? <FormTabInput></FormTabInput> : ""}
    </li>
  );
}

export default function FormSection({ children, title, first_section = true }) {
  const [current, setCurrent] = useState(0);

  const changeFormSection = (id) => {};
  const prev = () => {
    let formSections = document.querySelectorAll(".form-sections");

    setCurrent((current) =>
      current == 0 ? formSections.length - 1 : current - 1
    );
  };
  const next = () => {
    let formSections = document.querySelectorAll(".form-sections");

    setCurrent((current) =>
      current == formSections.length - 1 ? 0 : current + 1
    );
  };
  return (
    <section
      className={`form-sections h-full flex-col items-end gap-7  ${
        first_section == true ? "flex" : "hidden"
      }`}
    >
      <h1 className="text-3xl font-black text-royale-green">{title}</h1>
      {children}
      <footer className="flex w-full items-center justify-between">
        <button id="previous" onClick={prev}>
          قبلی
        </button>
        <div>{current}</div>
        <button id="next" onClick={next}>
          بعدی
        </button>
      </footer>
    </section>
  );
}

// export default function Form() {
//   return (
//     <section className="flex w-96 overflow-hidden">
//       <FormSection>
//         <FormTab
//           title="تک بخشی"
//           description="دارای یک دکمه اصلی برای ورود به صفحه منو"
//           icon_src="/images/single.svg"
//           type="toggle"
//           input_type="text"
//           id={1}
//         ></FormTab>
//         <FormTab
//           title="چند بخشی"
//           description="دارای بخش های جداگانه مانند: منو کافه و منو رستوران"
//           type="toggle"
//           icon_src="/images/couple.svg"
//           id={2}
//         ></FormTab>
//         <FormTab
//           title="بدون صفحه اصلی"
//           description="بلافاصله پس از استفاده از QR code وارد منو میشود"
//           icon_src="/images/none.svg"
//           type="radio"
//           id={3}
//         ></FormTab>
//       </FormSection>
//       <FormSection>
//         <FormTab
//           title="لینک ها"
//           description="... لینک های تلگرام و اینستاگرام و"
//           type="toggle"
//           input_type="text"
//           id={4}
//         ></FormTab>
//         <FormTab
//           title="شماره تماس"
//           description="نمایش شماره تماس کافه / رستوران"
//           type="radio"
//           id={5}
//         ></FormTab>
//         <FormTab
//           title="موقعیت مکانی"
//           description="نمایش آدرس و یا موقعت شما بر روی نقشه"
//           icon_src="/images/none.svg"
//           id={6}
//         ></FormTab>
//       </FormSection>
//       <FormSection>
//         <FormTab
//           title="bitch "
//           description="دارای یک دکمه اصلی برای ورود به صفحه منو"
//           type="toggle"
//           input_type="text"
//           id={7}
//         ></FormTab>
//         <FormTab
//           title="تک بخشی"
//           description="دارای یک دکمه اصلی برای ورود به صفحه منو"
//           type="radio"
//           id={8}
//         ></FormTab>
//         <FormTab
//           title="بدون صفحه اصلی"
//           description="دارای یک دکمه اصلی برای ورود به صفحه منو"
//           icon_src="/images/none.svg"
//           id={9}
//         ></FormTab>
//       </FormSection>
//     </section>
//   );
// }
