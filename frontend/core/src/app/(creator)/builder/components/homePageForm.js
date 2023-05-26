"use client";

import Image from "next/image";

function FormSectionInput() {
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

function FormSectionBooleanBtn() {
  return (
    <button className="flex w-14 items-center rounded-full border-2 border-royale-green p-1 shadow-inner">
      <span className="h-4 w-4 rounded-full bg-royale-green"></span>
    </button>
  );
}

function FormSectionRadioBtn() {
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

function FormSection({ title, description, icon_src, type, input_type = "" }) {
  return (
    <li className="flex w-80 cursor-pointer flex-col items-end gap-2 rounded-lg border-[3px] border-sad-blue bg-soft-blue p-3 text-royale-green">
      <div className="flex w-full items-center justify-between">
        {type == "boolean" ? (
          <FormSectionBooleanBtn></FormSectionBooleanBtn>
        ) : type == "radio" ? (
          <FormSectionRadioBtn></FormSectionRadioBtn>
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
      {input_type == "text" ? <FormSectionInput></FormSectionInput> : ""}
    </li>
  );
}

export default function HomePageForm() {
  return (
    <section className="flex flex-col items-end gap-7">
      <h1 className="text-3xl font-black text-royale-green">صفحه اصلی</h1>
      <ul className="flex flex-col gap-7">
        <FormSection
          title="تک بخشی"
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          type="boolean"
          input_type="text"
        ></FormSection>
        <FormSection
          title="تک بخشی"
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          type="radio"
        ></FormSection>
        <FormSection
          title="بدون صفحه اصلی"
          description="دارای یک دکمه اصلی برای ورود به صفحه منو"
          icon_src="/images/none.svg"
        ></FormSection>
      </ul>
      <footer className="flex w-full items-center justify-between">
        <button>قبلی</button>
        <div>hello</div>
        <button>بعدی</button>
      </footer>
    </section>
  );
}
