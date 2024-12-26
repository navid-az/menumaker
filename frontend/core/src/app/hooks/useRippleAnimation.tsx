import React, { useEffect, useCallback } from "react";

//types
export type RippleAnimationConfig = {
  size?: number;
  color?: string;
  duration?: number;
};

type UseRippleAnimationType = (
  element: React.RefObject<HTMLElement>,
  config?: RippleAnimationConfig,
  animate?: boolean
) => (e?: MouseEvent) => void;

export const useRippleAnimation: UseRippleAnimationType = (
  element,
  config = {},
  animate = true
) => {
  // Default config
  const { size = 100, color = "#FFF", duration = 800 } = config;

  const triggerAnimation = useCallback(
    (e?: MouseEvent) => {
      if (!animate || !element.current) return; // Prevent animation if `animate` is false

      const { style, classList } = element.current;
      const rect = element.current.getBoundingClientRect();
      const sizeOffset = size / 2;

      // Remove the class if already present to retrigger
      if (classList.contains("active")) {
        classList.remove("active");
        void element.current.offsetWidth; // Force reflow to reset the animation
      }

      style.setProperty("--effect-duration", `${duration}ms`);
      if (e) {
        // Ripple starts at mouse click position
        style.setProperty(
          "--effect-top",
          `${e.clientY - rect.top - sizeOffset}px`
        );
        style.setProperty(
          "--effect-left",
          `${e.clientX - rect.left - sizeOffset}px`
        );
      } else {
        // Ripple starts at the center of the element
        const centerX = (rect.left + rect.right) / 2;
        const centerY = (rect.top + rect.bottom) / 2;
        style.setProperty(
          "--effect-top",
          `${centerY - rect.top - sizeOffset}px`
        );
        style.setProperty(
          "--effect-left",
          `${centerX - rect.left - sizeOffset}px`
        );
      }

      style.setProperty("--effect-height", `${size}px`);
      style.setProperty("--effect-width", `${size}px`);
      style.setProperty("--effect-color", color);

      // Add the class to trigger the animation
      classList.add("active");
    },
    [animate, color, duration, size, element] // Include `animate` in dependencies
  );

  useEffect(() => {
    if (element.current) {
      const currentElement = element.current;

      // Dynamically manage event listeners based on `animate`
      if (animate) {
        currentElement.classList.add("effect-container");
        currentElement.addEventListener("mousedown", triggerAnimation);
      }

      return () => {
        currentElement.removeEventListener("mousedown", triggerAnimation);
      };
    }
  }, [triggerAnimation, animate]);

  return triggerAnimation;
};
