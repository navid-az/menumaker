import { useEffect } from "react";
import gsap from "gsap";

export const useTactileAnimation = (element, config) => {
  const { duration = 0.25, scale = 0.8 } = config;

  useEffect(() => {
    // const applyContainerProp = () => {
    //   element.current.classList.add("click-effect-container");
    // };

    // const applyStyles = () => {
    //   const { style } = element.current;

    //   style.setProperty("--effect-duration", `${duration}ms`);
    //   style.setProperty("--effect-scale", `${scale}`);
    // };

    const onClick = (e) => {
      element.current.classList.add("transition-all");
      var tl = gsap.timeline();
      tl.to(element.current, { scale: 0.7, duration: 0.15 })
        .to(element.current, { scale: 1.3, duration: 0.15 })
        .to(element.current, { scale: 1, duration: 0.15 });
      // applyStyles(e);
    };

    // applyContainerProp();

    element.current.addEventListener("mouseup", onClick);

    const cleanupRef = element.current;

    return () => {
      cleanupRef.removeEventListener("mouseup", onClick);
    };
  }, [scale, duration, element]);
};
