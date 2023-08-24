"use client";

import { useState, useRef, useReducer, useEffect } from "react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ToolTip";
import { Popover, PopoverTrigger, PopoverContent } from "./PopOver";
import IconSelectorList from "./IconSelectorLIst";
import Button from "./Button";

// export function TextInput({
//   type = "text",
//   name,
//   id,
//   value,
//   setValue,
//   placeholder = "",
// }) {
//   return (
//     <div className="flex w-full rounded-lg border-2 border-sad-blue bg-white p-[12px] transition-colors duration-300 ease-in-out">
//       {/* <Image src="/images/envelope.svg" width={20} height={20}></Image> */}
//       <input
//         className="h-full w-full text-sm font-normal text-royale-green outline-none autofill:bg-inherit"
//         type={type}
//         value={value}
//         onChange={setValue}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// }

// export function FormTabInput({ id, action }) {
//   const [value, setValue] = useState("");
//   const [links, setLinks] = useState([]);
//   // set icon of the input depending on the value
//   let icon = "";
//   let linkType = "";
//   if (value.includes("instagram.com")) {
//     icon = "/images/instagram.svg";
//     linkType = "اینستاگرام";
//   } else if (value.includes("t.me")) {
//     icon = "/images/telegram.svg";
//     linkType = "تلگرام";
//   }

//   return (
//     <>
//       <div className="flex h-11 w-full items-end gap-2 rounded-lg bg-sad-blue p-2 text-end text-xs">
//         <button
//           onClick={(e) => action(e)}
//           className="flex h-full w-auto flex-grow items-center justify-center rounded-md bg-royale-green text-center font-bold text-sky-blue"
//         >
//           ثبت
//         </button>
//         <input
//           name="link-input"
//           className="h-full w-3/5 flex-grow bg-sad-blue text-end placeholder:text-royale-green-dark focus:outline-0"
//           placeholder="لینک را در اینجا کپی کنید"
//           type="text"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           id={`input-${id}`}
//         />
//         {icon == "" ? (
//           ""
//         ) : (
//           <Image
//             className="flex h-full items-center"
//             src={icon}
//             width={18}
//             height={18}
//             alt="link icon"
//           ></Image>
//         )}
//       </div>
//       {links.length > 0 ? (
//         <div className="grid w-full grid-flow-row grid-cols-2 grid-rows-2 justify-start gap-2">
//           {links}
//         </div>
//       ) : (
//         ""
//       )}
//     </>
//   );
// }
const ACTIONS = { ADD_ITEM: "addItem", DELETE_ITEM: "deleteItem" };

function reducer(items, action) {
  console.log(
    action.payload,
    action.payload.inputValue,
    action.payload.selectedIcon.name,
    "helloooooooooo"
  );
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      return [
        ...items,
        newItem(action.payload.inputValue, action.payload.selectedIcon),
      ];
    default:
      state;
  }
}

function newItem(name, icon) {
  return { name: name, icon: icon.name };
}

export const NameGiverInput = ({
  placeholder,
  valueCount = 2,
  secondary_btn = { name: "iconSelector", toolTip: "" },
}) => {
  const [icons, setIcons] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [items, dispatch] = useReducer(reducer, []);

  return (
    <div className="hidden w-full flex-col gap-2">
      <Input placeholder={placeholder} dispatch={dispatch}>
        <Popover>
          <PopoverTrigger>
            {/* {option == "iconSelector" ? (
              <InputButton
                name="آیکون"
                toolTip="انتخاب یک آیکون برای بخش مورد نظر"
              ></InputButton>
            ) : option == "dropDown" ? (
              <InputButton
                name="انتخاب شعبه"
                toolTip="از بین شعبه های ثبت شده شعبه ای که این اطلاعات به آن مربوط است را مشخص میکند"
              ></InputButton>
            ) : (
              ""
            )} */}
            {/* <InputButton
              name={secondary_btn.name}
              toolTip={secondary_btn.toolTip}
            ></InputButton> */}
            <Button
              variant="square"
              content="ثبت"
              style="!h-full"
              toolTip="انتخاب یک آیکون برای بخش مورد نظر"
            ></Button>
          </PopoverTrigger>
          <PopoverContent className="Popover">
            <IconSelectorList
              action={(selectedIcon) =>
                dispatch({
                  type: ACTIONS.ADD_ITEM,
                  payload: { selectedIcon: selectedIcon },
                })
              }
            ></IconSelectorList>
          </PopoverContent>
        </Popover>
      </Input>
      {/* added items list */}
      {itemsList.length > 0 && (
        <div className="rounded-md bg-sad-blue p-2">
          <header className="flex flex-col gap-2">
            <h3 className="w-full text-right font-semibold text-royale-green">
              لیست بخش ها
            </h3>
            {/* <div className="flex flex-col gap-2">
              {inputValues.map((item, index) => (
                <li className="border-b-2 border-royale-green/80 p-2 text-right text-royale-green last-of-type:border-b-0">
                  {item}
                  {icons[index + 1]}
                </li>
              ))}
            </div> */}
          </header>
        </div>
      )}
    </div>
  );
};

const Input = ({
  placeholder,
  hasSubmitBtn = true,
  children,
  action,
  dispatch,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputWrapper = useRef();

  useEffect(() => {}, [inputValue]);
  const handleSubmit = () => {
    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: { name: inputValue },
    });
  };

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
        {/* {hasSubmitBtn && (
          <InputButton
            name="ثبت"
            isSubmit={hasSubmitBtn}
            action={handleSubmit}
          ></InputButton>
        )} */}
        <button
          onClick={handleSubmit}
          className="flex h-full w-full grow-0 items-center justify-center rounded-md bg-royale-green text-center text-sm font-bold text-sky-blue transition-all active:scale-90"
        >
          ثبت
        </button>
        {/* other btns  */}
        {children}

        <input
          name="link-input"
          className="h-full w-auto grow rounded-lg bg-sad-blue p-1 text-end text-sm placeholder:text-royale-green-dark focus:outline-0"
          placeholder={placeholder}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
  isSubmit = false,
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
      {isOpen && isMounted && isSubmit == false && (
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
