import { Tooltip, TooltipContent, TooltipTrigger } from "./ToolTip";
import Image from "next/image";

export default function Button({
  variant,
  size,
  onClick,
  content,
  iconSrc = "",
  style = "",
  name = "",
  toolTip = "",
  type = "button",
}) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button
          type={type}
          onClick={onClick}
          name={name}
          className={`flex select-none items-center justify-between gap-1  ${
            variant == "circular"
              ? "rounded-full"
              : variant == "square"
              ? "rounded-md"
              : ""
          }  bg-royal-green px-5 py-2 text-sm font-bold text-sky-blue transition-all duration-200 ease-in-out hover:gap-4 active:scale-90 ${style}`}
        >
          {content}
          {iconSrc ? (
            <Image src={iconSrc} width={20} height={20} alt={content}></Image>
          ) : (
            ""
          )}
        </button>
      </TooltipTrigger>
      {toolTip ? (
        <TooltipContent>
          <div className="rounded-md bg-royal-green-dark p-2 text-center text-xs font-normal text-soft-blue opacity-90">
            {toolTip}
          </div>
        </TooltipContent>
      ) : (
        ""
      )}
    </Tooltip>
  );
}
