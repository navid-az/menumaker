import React from "react";

//components
import PaletteSuggestion from "./PaletteSuggestion";

type PaletteSuggestionsType = {
  palettes: string[][];
};

const PaletteSuggestions = ({ palettes }: PaletteSuggestionsType) => {
  return (
    <div className="grid w-full grid-cols-3 gap-2 py-[6px]">
      {palettes.map((palette) => (
        <PaletteSuggestion colors={palette}></PaletteSuggestion>
      ))}
    </div>
  );
};

export default PaletteSuggestions;
