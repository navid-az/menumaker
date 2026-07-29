import React, { useState, useMemo } from "react";

//components
import SuggestedPalette from "./SuggestedPalette";

type PaletteSuggestionsType = {
  globalStyle?: "default" | "retro";
  initialPalettePack?: "default" | "retro";
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

// Set of suggestions for every global styling
const palettePacks = {
  default: [
    // Black & White
    ["#F8F8F8", "#0F0000"],

    // 🍷 Elegant Café (Warm & Cozy)
    ["#4B2E22", "#F5EBDC", "#D2691E", "#FAF7F2"],

    // 🍋 Modern Minimal (Clean & Readable)
    ["#F5F5F5", "#2C2C2C", "#A6E22E", "#FFFFFF"],

    // 🍓 Playful Retro (Vibrant & Nostalgic)
    ["#E63946", "#F1FAEE", "#06B6D4", "#FFF8E7"],

    // 🫒 Natural / Organic (Earthy Calm)
    ["#A8BCA2", "#4b2e22", "#C46B4E", "#F9F5EB"],

    // 🍫 Luxury Dark (Premium / Steakhouse)
    ["#1C1C1C", "#EADCA6", "#800020", "#FFF7F7"],
  ],
  retro: [
    // 🍋 Modern Minimal (Clean & Readable)
    ["#F5F5F5", "#2C2C2C", "#A6E22E", "#FFFFFF"],

    // 70s vibe
    ["#A8DADC", "#000000", "#fbffad", "#fff4e9"],

    // Candy shop
    ["#f7ccff", "#440051", "#a3d9ff", "#fef4ff"],

    // ORANGE
    ['#ffa644', '#000000', '#bfc8ad', '#fffcf3']
  ],
};

export default function SuggestedPalettes({
  globalStyle = "default",
  initialPalettePack = "default",
  defaultValue = ["#F8F8F8", "#0F0000"],
  value,
  onChange,
}: PaletteSuggestionsType) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const activePalette = isControlled ? value! : internalValue;

  const activePack =
    palettePacks[globalStyle] ?? palettePacks[initialPalettePack];
  const palettesToShow = useMemo(() => activePack, [activePack]);

  return (
    <div className="grid w-full grid-cols-3 gap-2 py-[6px]">
      {palettesToShow.map((palette, index) => (
        <SuggestedPalette
          key={index}
          value={activePalette}
          onChange={onChange ?? setInternalValue}
          palette={palette}
        />
      ))}
    </div>
  );
}
