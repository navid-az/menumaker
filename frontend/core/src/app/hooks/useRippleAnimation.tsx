import React, { useEffect } from "react";

type UseRippleAnimationType = (
  element: React.RefObject<HTMLElement>,
  config: { size?: number; color?: string; duration?: number }
) => void;

export const useRippleAnimation: UseRippleAnimationType = (element, config) => {
  //default config
  const { size = 100, color = "#FFF", duration = 800 } = config;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (element.current) {
        element.current.classList.remove("active");

        const { style } = element.current;
        const rect = element.current.getBoundingClientRect();
        const sizeOffset = size / 2.02;

        style.setProperty("--effect-duration", `${duration}ms`);
        style.setProperty(
          "--effect-top",
          `${e.clientY - rect.top - sizeOffset}px`
        );
        style.setProperty(
          "--effect-left",
          `${e.clientX - rect.left - sizeOffset}px`
        );
        style.setProperty("--effect-height", `${size}px`);
        style.setProperty("--effect-width", `${size}px`);
        style.setProperty("--effect-color", color);

        element.current?.classList.add("active");
      }
    };

    if (element.current) {
      element.current.classList.add("effect-container");
      element.current.addEventListener("mousedown", onClick);
    }

    return () => {
      if (element.current) {
        element.current.removeEventListener("mousedown", onClick);
      }
    };
  }, [color, duration, element, size]);
};
