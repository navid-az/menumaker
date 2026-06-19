import React, { useRef } from "react";

//components
import Palette from "./Palette";

//SVGs
import { Check } from "lucide-react";

//types
type SuggestedPaletteType = {
  palette: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const SuggestedPalette = ({
  palette,
  value = ["#0d3b66", "#faf0ca", "#f4d35e"],
  onChange,
}: SuggestedPaletteType) => {
  //check if arrays are equal
  function arraysEqual(a: string[], b: string[]) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => val === b[i]);
  }

  return (
    <div
      className={`relative rounded-full border-[3.5px] transition-all duration-200 ${
        arraysEqual(value, palette)
          ? "pointer-events-none scale-95 border-primary"
          : "border-transparent"
      } `}
      onClick={() => onChange?.(palette)}
    >
      <Palette disableOptions colors={palette}></Palette>
      {arraysEqual(value, palette) && (
        <Check className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-primary p-1 text-sad-blue"></Check>
      )}
    </div>
  );
};

export default SuggestedPalette;
