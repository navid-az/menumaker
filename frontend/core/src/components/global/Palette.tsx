import React from "react";

//components
import { Button } from "../ui/button";

//SVGs
import { X } from "lucide-react";

//functions
import lightenDarkenColor from "@/lib/lightenDarkenColor";

//hooks
import { useColorPalette } from "@/lib/stores";

//types
type PaletteType = {
  colors: string[];
  disableOptions?: boolean;
};

const Palette = ({
  colors,
  disableOptions = false, //if `true`: simple color palette visualizer
}: PaletteType) => {
  const removeColor = useColorPalette((state) => state.removeColor);

  const handleDelete = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    removeColor(index);
  };

  return (
    <div className="flex h-10 flex-1 flex-row-reverse rounded-full bg-white outline outline-2 outline-primary">
      {colors.map((color, index) => (
        <div
          key={index}
          className="group flex flex-1 cursor-pointer items-center justify-center gap-4 rounded-none transition-all duration-200 first:rounded-l-full last:rounded-r-full hover:basis-3/12"
          style={{
            backgroundColor: color,
          }}
        >
          {disableOptions ? null : colors.length > 2 ? (
            <>
              <Button
                onClick={(e) => handleDelete(e, index)}
                className="w-auto bg-transparent opacity-0 transition-all duration-200 hover:scale-125 hover:!opacity-100 group-hover:opacity-80"
                size="icon"
              >
                <X
                  style={{
                    color: lightenDarkenColor(color, 140),
                  }}
                ></X>
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default Palette;
