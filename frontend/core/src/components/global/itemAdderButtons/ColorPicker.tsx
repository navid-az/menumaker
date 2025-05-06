import React, { useState } from "react";

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

//SVGs
import { Plus } from "lucide-react";

export default function ColorPicker({
  defaultValue = "#FFFFFF",
  value,
  onChange,
  children,
}: {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [tempColor, setTempColor] = useState(defaultValue);

  const isControlled = value !== undefined;
  const color = isControlled ? value : internalValue;

  const addColor = () => {
    if (!isControlled) {
      setInternalValue(tempColor);
    }
    onChange?.(tempColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent asChild>
        <div className="flex h-full flex-col gap-4 !rounded-xl border-2 border-primary bg-soft-blue !p-4">
          <HexColorPicker
            className="custom-color-picker !h-44 !w-full"
            color={tempColor}
            onChange={setTempColor}
          ></HexColorPicker>

          <div className="relative">
            <div
              className="absolute bottom-0 right-1 top-1 h-8 w-8 rounded-md border"
              style={{
                backgroundColor: tempColor ? tempColor : defaultValue,
              }}
            ></div>
            <Input
              className="uppercase focus:border-transparent"
              dir="ltr"
              type="text"
              placeholder="#FFFFFF"
              value={tempColor}
              onChange={(e) => setTempColor(e.target.value)}
            />
          </div>
          <Button className="flex gap-2 text-sad-blue" onClick={addColor}>
            افزودن رنگ
            <Plus></Plus>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
