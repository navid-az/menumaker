"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-primary p-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-soft-blue rtl:flex-row-reverse",
  {
    variants: {
      size: {
        sm: "h-6 w-11",
        default: "h-7 w-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);
const thumbVariants = cva(
  "pointer-events-none block rounded-full shadow-lg ring-0 transition-all data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-[0.4px] data-[state=checked]:bg-primary-foreground data-[state=unchecked]:bg-primary",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5 data-[state=checked]:translate-x-7",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);
interface ExtendedSwitchProps {
  size?: "default" | "sm" | null | undefined;
}

type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root> &
  ExtendedSwitchProps;

const Switch: React.ForwardRefExoticComponent<SwitchProps> = React.forwardRef(
  ({ className, size, ...props }, ref) => {
    return (
      <SwitchPrimitives.Root
        className={cn(switchVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        <SwitchPrimitives.Thumb
          className={cn(thumbVariants({ size, className }))}
        />
      </SwitchPrimitives.Root>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
