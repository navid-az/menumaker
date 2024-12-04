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

function ColorPicker() {
  const [color, setColor] = useState("#aabbcc");

  return (
    <div className="h-max w-full rounded-md bg-sad-blue p-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" className="gap-2 py-1 pl-1">
            پس زمینه
            <div
              className="aspect-square h-full rounded-sm"
              style={{
                backgroundColor: color ? color : "#FFFFFF",
              }}
            ></div>
          </Button>
        </PopoverTrigger>
        <PopoverContent asChild>
          <div className="flex h-full flex-col gap-4 !rounded-xl !p-4">
            <HexColorPicker
              className="custom-color-picker !h-44 !w-full"
              color={color}
              onChange={setColor}
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
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ColorPicker;
