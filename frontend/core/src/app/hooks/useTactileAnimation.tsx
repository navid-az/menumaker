import { useEffect, useCallback } from "react";
import gsap from "gsap";

type UseTactileAnimationType = (
  element: React.RefObject<HTMLElement>,
  config: { duration?: number; scale?: number }
) => () => void;

export const useTactileAnimation: UseTactileAnimationType = (
  element,
  config
) => {
  const { duration = 0.2, scale = 0.9 } = config;

  const triggerAnimation = useCallback(() => {
    if (element.current) {
      element.current.classList.add("transition-all");
      element.current.classList.add("scale-pro");

      const tl = gsap.timeline();
      tl.to(element.current, { scale: scale, duration: duration })
        .to(element.current, { scale: 1.04, duration: duration })
        .to(element.current, { scale: 1, duration: duration });
    }
  }, [element, scale, duration]);

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("mouseup", triggerAnimation);

      const cleanupRef = element.current;

      return () => {
        cleanupRef.removeEventListener("mouseup", triggerAnimation);
      };
    }
  }, [triggerAnimation]);

  return triggerAnimation;
};
