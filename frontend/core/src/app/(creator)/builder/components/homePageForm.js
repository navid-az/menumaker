"use client";

import Image from "next/image";
import { useState, useRef, forwardRef } from "react";

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

function FormTabInput({ id }) {
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
  const handleClick = (e) => {
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
    <>
      <div className="flex h-11 w-full items-end gap-2 rounded-lg bg-sad-blue p-2 text-end text-xs">
        <button
          onClick={(e) => handleClick(e)}
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

export const ToggleBtn = ({ onClick, toggle, isCheckbox }) => {
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
};

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
      className="flex max-h-24 w-96 cursor-pointer flex-col items-end justify-between gap-2 overflow-hidden rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royale-green transition-all duration-500 ease-in-out"
    >
      <div className="flex w-full items-center justify-between">
        {type == "toggle" ? (
          <ToggleBtn onClick={handleClick} toggle={btn} id={id}></ToggleBtn>
        ) : type == "radio" ? (
          <RadioBtn onClick={handleRadio} id={id}></RadioBtn>
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
      {input_type == "text" ? <FormTabInput id={id}></FormTabInput> : ""}
    </li>
  );
}

export function FormSection({ children }) {
  const handleRadio = (e) => {
    e.preventDefault();
  };
  return (
    <section
      className={
        "form-sections flex h-full flex-col items-end justify-between gap-7"
      }
    >
      {children}
    </section>
  );
}

export default function Form({ children, title }) {
  const handleNextBtn = () => {};
  return (
    <section className="flex w-96 flex-col items-end gap-7 overflow-x-auto">
      <h1 className="text-3xl font-black text-royale-green">{title}</h1>
      <div className="flex">{children}</div>
      <footer className="flex w-full items-center justify-between">
        <button onClick={(e) => handlePrevBtn(e)}>قبلی</button>
        <div>gello</div>
        <button onClick={(e) => handleNextBtn(e)}>بعدی</button>
      </footer>
    </section>
  );
}
