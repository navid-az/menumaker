import React, { useEffect, useCallback } from "react";

//types
export type RippleAnimationConfig = {
  size?: number;
  color?: string;
  duration?: number;
};
type UseRippleAnimationType = (
  element: React.RefObject<HTMLElement>,
  config: RippleAnimationConfig
) => (e?: MouseEvent) => void;

export const useRippleAnimation: UseRippleAnimationType = (element, config) => {
  //default config
  const { size = 100, color = "#FFF", duration = 800 } = config;

  const triggerAnimation = useCallback(
    (e?: MouseEvent) => {
      if (element.current) {
        element.current.classList.remove("active");

        const { style } = element.current;
        const rect = element.current.getBoundingClientRect();
        const sizeOffset = size / 2.02;

        style.setProperty("--effect-duration", `${duration}ms`);
        if (e) {
          style.setProperty(
            "--effect-top",
            `${e.clientY - rect.top - sizeOffset}px`
          );
          style.setProperty(
            "--effect-left",
            `${e.clientX - rect.left - sizeOffset}px`
          );
        } else {
          const rect = element.current.getBoundingClientRect();
          const centerX = (rect.left + rect.right) / 2;
          const centerY = (rect.top + rect.bottom) / 2;
          setTimeout(() => {
            style.setProperty(
              "--effect-top",
              `${centerY - rect.top - sizeOffset}px`
            );
            style.setProperty(
              "--effect-left",
              `${centerX - rect.left - sizeOffset}px`
            );
          }, 100);
        }
        style.setProperty("--effect-height", `${size}px`);
        style.setProperty("--effect-width", `${size}px`);
        style.setProperty("--effect-color", color);

        element.current?.classList.add("active");
      }
    },
    [color, duration, element, size]
  );

  useEffect(() => {
    if (element.current) {
      element.current.classList.add("effect-container");
      element.current.addEventListener("mousedown", triggerAnimation);
    }

    return () => {
      if (element.current) {
        element.current.removeEventListener("mousedown", triggerAnimation);
      }
    };
  }, [triggerAnimation]);

  return triggerAnimation;
};
