import React, { useRef } from "react";

//components
import { Label } from "@/components/ui/label";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation"; //animation hook

//types
type TileType = {
  title: string;
  description?: string;
  isActive?: boolean;
  isButton?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
};

function Tile({
  title,
  description,
  isActive,
  isButton = false,
  onClick,
  children,
}: TileType) {
  const tileRef = useRef(null);

  //animation on click
  useTactileAnimation(tileRef, { scale: 0.02 });

  return (
    <Label
      className={`${
        isActive
          ? "border-primary hover:border-primary"
          : "border-sad-blue hover:border-primary/40"
      } ${
        isButton && "hover:border-primary"
      } relative flex h-full flex-1 cursor-pointer select-none flex-col items-center justify-between rounded-lg border-[3px] bg-soft-blue p-2 text-royal-green transition-[border-color,box-shadow] duration-300 hover:shadow-xl`}
      ref={tileRef}
      onClick={onClick}
    >
      <div className="absolute left-2 top-2 flex w-full justify-end">
        {children}
      </div>
      <section className="flex flex-1 items-center">
        <p className="text-xl sm:text-2xl">{title}</p>
        <p className="text-xl">{description}</p>
      </section>
    </Label>
  );
}

export default Tile;
