import { useEffect } from "react";
import gsap from "gsap";

export const useTactileAnimation = (element, config) => {
  const { duration = 0.2, scale = 0.9 } = config;

  useEffect(() => {
    const onClick = () => {
      element.current.classList.add("transition-all");
      var tl = gsap.timeline();
      tl.to(element.current, { scale: scale, duration: duration })
        .to(element.current, { scale: 1.04, duration: duration })
        .to(element.current, { scale: 1, duration: duration });
    };

    element.current.addEventListener("mouseup", onClick);

    const cleanupRef = element.current;

    return () => {
      cleanupRef.removeEventListener("mouseup", onClick);
    };
  }, [scale, duration, element]);
};
