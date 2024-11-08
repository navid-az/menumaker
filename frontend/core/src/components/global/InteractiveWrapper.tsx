"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";

// hooks (animations)
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//components
import Slot from "./Slot";

//types
import { type AsChildProps } from "./Slot";
type AnimationConfig = {
  duration?: number;
  size?: number;
  scale?: number;
  [key: string]: any;
};

type WrapperProps = AsChildProps<React.HtmlHTMLAttributes<HTMLElement>> & {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  animations?: {
    ripple?: AnimationConfig;
    tactile?: AnimationConfig;
    pulse?: AnimationConfig;
    shake?: AnimationConfig;
  };
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
    useRippleAnimation(
      elementRef,
      { duration: 600, size: 200 },
      !!animations.ripple
    );
    useTactileAnimation(
      elementRef,
      { duration: 0.1, scale: 0.9 },
      !!animations.ripple
    );

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
