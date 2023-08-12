"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  useFloating,
  autoUpdate,
  useHover,
  offset,
  shift,
  flip,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { Popover, PopoverTrigger, PopoverContent } from "./PopOver";
import IconSelectorList from "./IconSelectorLIst";

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

export const NameGiverInput = ({ placeholder, valueCount = 2 }) => {
  const [icons, setIcons] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  const handleSubmit = (value) => {
    inputValues.length <= valueCount && setInputValues([...inputValues, value]);
  };

  const handleSelect = (selectedIcon) => {
    setIcons([...icons, selectedIcon]);
    // console.log(icons);
  };
  return (
    <div className="hidden w-full flex-col gap-2">
      <Input placeholder={placeholder} action={handleSubmit}>
        <Popover>
          <PopoverTrigger>
            <InputButton
              name="آیکون"
              toolTip="انتخاب یک آیکون برای بخش مورد نظر"
            ></InputButton>
          </PopoverTrigger>
          <PopoverContent className="Popover">
            <IconSelectorList
              action={(selectedIcon) => handleSelect(selectedIcon)}
            ></IconSelectorList>
          </PopoverContent>
        </Popover>
      </Input>
      {/* added items list */}
      {inputValues.length > 0 && (
        <div className="rounded-md bg-sad-blue p-2">
          <header className="flex flex-col gap-2">
            <h3 className="w-full text-right font-semibold text-royale-green">
              لیست بخش ها
            </h3>
            <div className="flex flex-col gap-2">
              {inputValues.map((item, index) => (
                <li className="border-b-2 border-royale-green/80 p-2 text-right text-royale-green last-of-type:border-b-0">
                  {item}
                  {icons[index + 1]}
                </li>
              ))}
            </div>
          </header>
        </div>
      )}
    </div>
  );
};

const Input = ({ placeholder, isSubmit = true, children, action }) => {
  const [value, setValue] = useState("");
  const inputWrapper = useRef();

  const inputFocus = () => {
    inputWrapper.current.style.borderColor = "#0F2C30";
  };

  return (
    <>
      <div
        ref={inputWrapper}
        onClick={inputFocus}
        className="flex h-11 w-full flex-initial items-end gap-2 rounded-lg border-2 border-sad-blue bg-sad-blue p-1 text-end text-xs transition-all"
      >
        {/* submit btn  */}
        {isSubmit && (
          <InputButton
            name="ثبت"
            options={{ isSubmit: isSubmit }}
            action={() => action(value)}
          ></InputButton>
        )}

        {children}
        <input
          name="link-input"
          className="h-full w-auto grow rounded-lg bg-sad-blue p-1 text-end text-sm placeholder:text-royale-green-dark focus:outline-0"
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          // id={`input-${id}`}
        />
      </div>
    </>
  );
};

export const InputButton = ({
  name,
  iconName,
  toolTip,
  action,
  options = { isSubmit: false },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: "top",
    middleware: [offset(4), flip(), shift()],
  });

  const hover = useHover(context, { delay: { open: 500, close: 0 } });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  const { isMounted, styles } = useTransitionStyles(context);
  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={action}
        className="flex h-full w-full grow-0 items-center justify-center rounded-md bg-royale-green text-center text-sm font-bold text-sky-blue transition-all active:scale-90"
      >
        {name}
      </button>

      {/* add toolTip for buttons which are not submit buttons */}
      {isOpen && isMounted && options.isSubmit == false && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{ ...styles, ...floatingStyles }}
          className="rounded-md bg-royale-green-dark p-2 text-xs font-normal text-soft-blue opacity-90"
        >
          {toolTip}
        </div>
      )}
    </>
  );
};
