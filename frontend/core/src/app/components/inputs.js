"use client";

import { useState } from "react";

export function TextInput({
  type = "text",
  name,
  id,
  value,
  setValue,
  placeholder = "",
}) {
  return (
    <div className="flex w-full rounded-lg border-2 border-sad-blue bg-white p-[12px] transition-colors duration-300 ease-in-out">
      {/* <Image src="/images/envelope.svg" width={20} height={20}></Image> */}
      <input
        className="h-full w-full text-sm font-normal text-royale-green outline-none autofill:bg-inherit"
        type={type}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
    </div>
  );
}

export function FormTabInput({ id, action }) {
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
