import React, { useState } from "react";

//components
import SuggestedPalette from "./SuggestedPalette";

type PaletteSuggestionsType = {
  defaultPalettes?: string[][];
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const SuggestedPalettes = ({
  defaultPalettes = [
    ["#264653", "#E76F51"],
    ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D"],
    ["#CBDFBD", "#F19C79", "#A44A3F"],
    ["#011627", "#FF3366", "#2EC4B6", "#F7B801", "#E71D36"],
    ["#A8DADC", "#457B9D", "#E63946", "#F1FAEE"],
  ],
  defaultValue = ["#0d3b66", "#faf0ca", "#f4d35e"],
  value,
  onChange,
}: PaletteSuggestionsType) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const activePalette = isControlled ? value : internalValue;

  return (
    <div className="grid w-full grid-cols-3 gap-2 py-[6px]">
      {defaultPalettes.map((palette, index) => (
        <SuggestedPalette
          key={index}
          value={activePalette}
          onChange={onChange}
          palette={palette}
        ></SuggestedPalette>
      ))}
    </div>
  );
};

export default SuggestedPalettes;
