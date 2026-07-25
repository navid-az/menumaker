import React from "react";

//functions
import { cn } from "@/lib/utils";

//SVGs
import IphoneFrame from "@/components/global/IphoneFrame";

interface IPhoneMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  screenClassName?: string;
}

interface ScreenProps extends React.HTMLAttributes<HTMLDivElement> {}

const Screen = React.forwardRef<HTMLDivElement, ScreenProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-full w-full overflow-auto bg-background", className)}
      {...props}
    />
  )
);

Screen.displayName = "IPhoneMockup.Screen";

export const IPhoneMockup = Object.assign(
  React.forwardRef<HTMLDivElement, IPhoneMockupProps>(
    ({ className, screenClassName, children, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={cn("relative aspect-430/874", className)}
          {...props}
        >
          {/* Screen */}
          <div
            className={cn(
              "absolute overflow-hidden opacity-80 rounded-[42px]",
              screenClassName
            )}
            style={{
              left: "5.6%",
              top: "2.3%",
              width: "88.9%",
              height: "95.3%",
            }}
          >
            {children}
          </div>
          <IphoneFrame className="pointer-events-none absolute inset-0 h-full w-full select-none"></IphoneFrame>
        </div>
      );
    }
  ),
  {
    Screen,
  }
);

IPhoneMockup.displayName = "IPhoneMockup";
