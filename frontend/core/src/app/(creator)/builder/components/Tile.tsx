import React, { useRef } from "react";

//hooks
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation"; //animation hook
import { Label } from "@/components/ui/label";
//types
type TileType = {
  title: string;
  description?: string;
  isActive?: boolean;
  children?: React.ReactNode;
};

function Tile({ title, description, isActive, children }: TileType) {
  const tileRef = useRef(null);

  //animation on click
  useTactileAnimation(tileRef, { scale: 0.02 });

  return (
    <Label
      ref={tileRef}
      className={`${
        isActive
          ? "border-primary hover:border-primary"
          : "border-sad-blue hover:border-primary/20"
      } relative flex h-full flex-1 cursor-pointer select-none flex-col items-center justify-between rounded-lg border-[3px] bg-soft-blue p-2 text-royal-green transition-[border-color] duration-300`}
    >
      <div className="absolute left-2 top-2 flex w-full justify-end">
        {children}
      </div>
      <section className="flex flex-1 items-center">
        <p className="text-2xl">{title}</p>
        <p className="text-xl">{description}</p>
      </section>
    </Label>
  );
}

export default Tile;
