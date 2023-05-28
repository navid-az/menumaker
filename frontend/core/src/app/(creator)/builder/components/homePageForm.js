"use client";

import Image from "next/image";
import { useState } from "react";

function FormTabInput() {
  return (
    <div className="flex h-11 w-full items-end rounded-lg border-2 border-royale-green bg-sad-blue p-2 text-end text-xs">
      <button className="flex h-full flex-grow items-center justify-center rounded-md bg-royale-green text-center text-sky-blue">
        ثبت
      </button>
      <input
        className="h-full flex-grow bg-sad-blue text-end placeholder:text-royale-green-dark"
        placeholder="لینک را در اینجا کپی کنید"
        type="text"
      />
    </div>
  );
}

function FormTabBooleanBtn() {
  return (
    <button className="flex w-14 items-center rounded-full border-2 border-royale-green p-1 shadow-inner">
      <span className="h-4 w-4 rounded-full bg-royale-green"></span>
      <input type="radio" name="" id="" />
    </button>
  );
}

function FormTabRadioBtn() {
  const handleRadioBtn = () => {
    let yes = document.getElementById("yes");
    yes.style.transform = "scale(1)";
  };
  return (
    <button
      onClick={handleRadioBtn}
      className="flex items-center justify-center rounded-full border-2 border-royale-green p-1"
    >
      <span
        className=" h-4 w-4 scale-0 rounded-full bg-royale-green transition duration-500 ease-in-out"
        id="yes"
      ></span>
    </button>
  );
}

function FormTab({ title, description, icon_src, type, input_type = "" }) {
  return (
    <li className="flex w-96 cursor-pointer flex-col items-end gap-2 rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royale-green">
      <div className="flex w-full items-center justify-between">
        {type == "boolean" ? (
          <FormTabBooleanBtn></FormTabBooleanBtn>
        ) : type == "radio" ? (
          <FormTabRadioBtn></FormTabRadioBtn>
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

function FormSection({ children, first_section = true }) {
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
      <h1 className="text-3xl font-black text-royale-green">صفحه اصلی</h1>
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

export default function Form() {
  return (
    <section className="flex w-96 overflow-hidden">
      <FormSection>
        <FormTab
          title="تک بخشی"
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          type="radio"
          icon_src="/images/single.svg"
        ></FormTab>
        <FormTab
          title="چند بخشی"
          description="دارای بخش های جداگانه مانند: منو کافه و منو رستوران"
          type="radio"
          icon_src="/images/couple.svg"
        ></FormTab>
        <FormTab
          title="بدون صفحه اصلی"
          description="بلافاصله پس از استفاده از QR code وارد منو میشود"
          icon_src="/images/none.svg"
          type="radio"
        ></FormTab>
      </FormSection>
      <FormSection>
        <FormTab
          title="لینک ها"
          description="... لینک های تلگرام و اینستاگرام و"
          type="boolean"
          input_type="text"
        ></FormTab>
        <FormTab
          title="شماره تماس"
          description="نمایش شماره تماس کافه / رستوران"
          type="radio"
        ></FormTab>
        <FormTab
          title="موقعیت مکانی"
          description="نمایش آدرس و یا موقعت شما بر روی نقشه"
          icon_src="/images/none.svg"
        ></FormTab>
      </FormSection>
      <FormSection>
        <FormTab
          title="bitch "
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          type="boolean"
          input_type="text"
        ></FormTab>
        <FormTab
          title="تک بخشی"
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          type="radio"
        ></FormTab>
        <FormTab
          title="بدون صفحه اصلی"
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          icon_src="/images/none.svg"
        ></FormTab>
      </FormSection>
    </section>
  );
}
