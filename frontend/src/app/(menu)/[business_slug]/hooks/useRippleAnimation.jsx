import { useEffect } from "react";

export const useRippleAnimation = (element, config) => {
  const { size = 100, color = "#FFF", duration = 800 } = config;

  useEffect(() => {
    const applyContainerProp = () => {
      element.current.classList.add("effect-container");
    };

    const applyStyles = (e) => {
      const { offsetX, offsetY } = e;
      const { style } = element.current;
      const sizeOffset = size / 2.02;

      style.setProperty("--effect-duration", `${duration}ms`);
      style.setProperty("--effect-top", `${offsetY - sizeOffset}px`);
      style.setProperty("--effect-left", `${offsetX - sizeOffset}px`);
      style.setProperty("--effect-height", `${size}px`);
      style.setProperty("--effect-width", `${size}px`);
      style.setProperty("--effect-color", color);
    };

    const onClick = (e) => {
      element.current.classList.remove("active");
      applyStyles(e);
      element.current.classList.add("active");
    };

    applyContainerProp();

    element.current.addEventListener("mousedown", onClick);

    const cleanupRef = element.current;

    return () => {
      cleanupRef.removeEventListener("mousedown", onClick);
    };
  }, [color, duration, element, size]);
};
