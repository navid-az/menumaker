import { useEffect, useCallback } from "react";

//libraries
import gsap from "gsap";

//types
export type TactileAnimationConfig = { duration?: number; scale?: number };
type UseTactileAnimationType = (
  element: React.RefObject<HTMLElement>,
  config?: TactileAnimationConfig,
  animate?: boolean
) => () => void;

export const useTactileAnimation: UseTactileAnimationType = (
  element,
  config = {},
  animate = true
) => {
  //default config
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
    if (element.current && animate) {
      element.current.addEventListener("mousedown", triggerAnimation);

      const cleanupRef = element.current;

      return () => {
        cleanupRef.removeEventListener("mousedown", triggerAnimation);
      };
    }
  }, [triggerAnimation]);

  return triggerAnimation;
};
