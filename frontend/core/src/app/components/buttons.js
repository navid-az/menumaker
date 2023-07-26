"use client";

import { useState } from "react";

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
