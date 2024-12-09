import React from "react";

//components
import SuggestedPalette from "./SuggestedPalette";

type PaletteSuggestionsType = {
  palettes: string[][];
};

const SuggestedPalettes = ({ palettes }: PaletteSuggestionsType) => {
  return (
    <div className="grid w-full grid-cols-3 gap-2 py-[6px]">
      {palettes.map((palette, index) => (
        <SuggestedPalette key={index} colors={palette}></SuggestedPalette>
      ))}
    </div>
  );
};

export default SuggestedPalettes;
