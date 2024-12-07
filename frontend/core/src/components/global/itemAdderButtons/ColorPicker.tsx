import React from "react";

//components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//libraries
import { HexColorPicker } from "react-colorful";
import { useColorPalette } from "@/lib/stores";

//SVGs
import { Plus } from "lucide-react";

//types
type ColorPickerType = {
  children: React.ReactNode;
};

function ColorPicker({ children }: ColorPickerType) {
  const addColor = useColorPalette((state) => state.updateColor);
  const color = useColorPalette((state) => state.selectedColor);
  const updateSelectedColor = useColorPalette(
    (state) => state.updateSelectedColor
  );
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent asChild>
        <div className="flex h-full flex-col gap-4 !rounded-xl border-2 border-primary bg-soft-blue !p-4">
          <HexColorPicker
            className="custom-color-picker !h-44 !w-full"
            color={color}
            onChange={updateSelectedColor}
          ></HexColorPicker>

          <div className="relative">
            <div
              className="absolute bottom-0 right-1 top-1 h-8 w-8 rounded-md border"
              style={{
                backgroundColor: color ? color : "#FFFFFF",
              }}
            ></div>
            <Input
              className="uppercase focus:border-transparent"
              dir="ltr"
              type="text"
              defaultValue={color}
              placeholder="#FFFFFF"
              value={color}
              onChange={(e) => updateSelectedColor(e.target.value)}
            />
          </div>
          <Button
            className="flex gap-2 text-sad-blue"
            onClick={() => addColor(color)}
          >
            افزودن رنگ
            <Plus></Plus>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
