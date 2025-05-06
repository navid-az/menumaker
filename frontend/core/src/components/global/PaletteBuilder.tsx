import React, { useRef, useState } from "react";

//components
import { Button } from "../ui/button";
import Palette from "./Palette";
import ColorPicker from "./itemAdderButtons/ColorPicker";

//SVGs
import { Plus, Minus } from "lucide-react";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

const PaletteBuilder = ({
  defaultValue = ["#0d3b66", "#faf0ca", "#f4d35e"],
  value,
  onChange,
}: {
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const colors = isControlled ? value : internalValue;

  const addBtnRef = useRef(null);
  const removeBtnRef = useRef(null);

  //click animations
  useTactileAnimation(addBtnRef);
  useTactileAnimation(removeBtnRef);

  const handleColorRemove = (index?: number) => {
    const updatedColors = [...colors]; // avoid mutating original

    if (typeof index === "number") {
      updatedColors.splice(index, 1); // remove exactly one item at index
    } else {
      updatedColors.pop(); // remove last color
    }

    if (!isControlled) {
      setInternalValue(updatedColors);
    }
    onChange?.(updatedColors);
  };

  const handleColorChange = (color: string) => {
    if (!isControlled) {
      setInternalValue([...colors, color]);
    }
    onChange?.([...colors, color]);
  };

  return (
    <section className="flex w-full gap-2 py-[6px]">
      <ColorPicker
        value={colors[0]}
        onChange={(color) => handleColorChange(color)}
      >
        <Button
          ref={addBtnRef}
          type="button"
          disabled={colors.length > 4}
          className="flex w-10 grow-0 cursor-pointer items-center justify-center rounded-full bg-primary p-0 text-primary transition-opacity duration-300"
        >
          <Plus className="text-sad-blue"></Plus>
        </Button>
      </ColorPicker>
      <Palette
        handleRemoveColor={(index) => handleColorRemove(index)}
        colors={colors}
      ></Palette>
      <Button
        ref={removeBtnRef}
        type="button"
        onClick={() => handleColorRemove()}
        disabled={colors.length < 3}
        className="flex w-10 grow-0 cursor-pointer items-center justify-center rounded-full bg-primary p-0 text-primary transition-opacity"
      >
        <Minus className="text-sad-blue"></Minus>
      </Button>
    </section>
  );
};

export default PaletteBuilder;
