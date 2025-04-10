import React, { useEffect, useRef } from "react";

//components
import { Button } from "../ui/button";
import Palette from "./Palette";
import ColorPicker from "./itemAdderButtons/ColorPicker";

//libraries
import { useFormContext } from "react-hook-form";

//SVGs
import { Plus, Minus } from "lucide-react";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";
import { useColorPalette } from "@/lib/stores";

const PaletteBuilder = () => {
  const colors = useColorPalette((state) => state.colors);
  const removeColor = useColorPalette((state) => state.removeColor);

  const addBtnRef = useRef(null);
  const removeBtnRef = useRef(null);
  const form = useFormContext();

  //click animations
  useTactileAnimation(addBtnRef);
  useTactileAnimation(removeBtnRef);

  const handleColorRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    removeColor();
  };

  //set colors to builderForm data
  useEffect(() => {
    form.setValue("global_styling.color_palette", colors);
  }, [colors]);

  return (
    <section className="flex w-full gap-2 py-[6px]">
      <ColorPicker>
        <Button
          ref={addBtnRef}
          disabled={colors.length > 4}
          className="flex w-10 grow-0 cursor-pointer items-center justify-center rounded-full bg-primary p-0 text-primary transition-opacity duration-300"
        >
          <Plus className="text-sad-blue"></Plus>
        </Button>
      </ColorPicker>
      <Palette colors={colors}></Palette>
      <Button
        ref={removeBtnRef}
        onClick={handleColorRemove}
        disabled={colors.length < 3}
        className="flex w-10 grow-0 cursor-pointer items-center justify-center rounded-full bg-primary p-0 text-primary transition-opacity"
      >
        <Minus className="text-sad-blue"></Minus>
      </Button>
    </section>
  );
};

export default PaletteBuilder;
