import React, { useRef } from "react";

//components
import Palette from "./Palette";

//hooks
import { useColorPalette } from "@/lib/stores";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//SVGs
import { Check } from "lucide-react";

const SuggestedPalette = ({ colors }: { colors: string[] }) => {
  const changePalette = useColorPalette((state) => state.changeColorPalette);
  const activePalette = useColorPalette((state) => state.colors);

  const btnRef = useRef(null);

  useTactileAnimation(btnRef, { scale: 0.2 });

  return (
    <div
      className={`poi relative rounded-full border-[3.5px] transition-all ${
        activePalette === colors
          ? "pointer-events-none border-primary"
          : "border-transparent"
      } `}
      ref={btnRef}
      onClick={() => changePalette(colors)}
    >
      <Palette disableOptions colors={colors}></Palette>
      {activePalette === colors && (
        <Check className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-primary p-1 text-sad-blue"></Check>
      )}
    </div>
  );
};

export default SuggestedPalette;
