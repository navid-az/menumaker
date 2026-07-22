import React from "react";

//functions
import { cn } from "@/lib/utils";

//components
import { Button } from "@/components/ui/button";

export default function FeatureNameCapsule({
  name,
  svg,
  className,
}: {
  name: string;
  svg: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      className={cn(
        "scale-pro h-8 md:h-10 flex text-xs md:text-sm gap-2 px-3 md:px-4 py-1 md:py-2 font-medium md:font-normal rounded-full border shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-300",
        className
      )}
    >
      {svg}
      {name}
    </Button>
  );
}
