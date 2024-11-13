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
  const { duration = 0.18, scale = 0.08 } = config;

  const triggerAnimation = useCallback(() => {
    if (element.current) {
      element.current.classList.add("transition-all");
      element.current.classList.add("scale-pro");

      const scaleDown = 1 - scale * 1.5;
      const scaleUp = 1 + scale;

      const tl = gsap.timeline();
      tl.to(element.current, {
        scale: scaleDown,
        duration: duration,
      })
        .to(element.current, {
          scale: scaleUp,
          duration: duration,
        })
        .to(element.current, {
          scale: 1,
          duration: duration,
        });
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
