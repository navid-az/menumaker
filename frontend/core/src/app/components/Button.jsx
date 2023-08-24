import { Tooltip, TooltipContent, TooltipTrigger } from "./ToolTip";

export default function Button({
  variant,
  size,
  onClick,
  content,
  style = "",
  name = "",
  toolTip = "",
}) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button
          onClick={onClick}
          name={name}
          className={`flex select-none items-center justify-between gap-1  ${
            variant == "circular"
              ? "rounded-full"
              : variant == "square"
              ? "rounded-md"
              : ""
          }  bg-royale-green px-6 py-2 text-sm font-bold text-sky-blue transition-all duration-200 ease-in-out hover:gap-4 active:scale-90 ${style}`}
        >
          {content}
        </button>
      </TooltipTrigger>
      {toolTip ? (
        <TooltipContent>
          <div className="rounded-md bg-royale-green-dark p-2 text-center text-xs font-normal text-soft-blue opacity-90">
            {toolTip}
          </div>
        </TooltipContent>
      ) : (
        ""
      )}
    </Tooltip>
  );
}
