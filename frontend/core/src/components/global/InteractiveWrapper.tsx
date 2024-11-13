"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";

// hooks (animations)
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//components
import Slot, { type AsChildProps } from "./Slot";

//types

//all available animation variants
export type AnimationVariantType = "ripple" | "tactile";
//available animations configs
export type AnimationConfigType = {
  ripple?: { duration?: number; size?: number; color?: string };
  tactile?: { duration?: number; scale?: number };
};
type WrapperProps = AsChildProps<React.HtmlHTMLAttributes<HTMLElement>> & {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  animations?: AnimationConfigType;
};

const InteractiveWrapper = forwardRef<HTMLElement, WrapperProps>(
  ({ asChild, children, animations = {}, ...props }, ref) => {
    const elementRef = useRef<HTMLElement | null>(null);

    const combinedRef = (node: HTMLElement | null) => {
      elementRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };
    useRippleAnimation(elementRef, animations.ripple, !!animations.ripple);
    useTactileAnimation(elementRef, animations.tactile, !!animations.tactile);

    // Use the ref only if elementRef.current is not null
    useImperativeHandle(
      ref,
      () => elementRef.current ?? ({} as HTMLElement),
      []
    );

    const Comp = asChild ? Slot : "div";

    return (
      <Comp ref={combinedRef} {...props}>
        {children}
      </Comp>
    );
  }
);
InteractiveWrapper.displayName = "InteractiveWrapper";

export default InteractiveWrapper;
