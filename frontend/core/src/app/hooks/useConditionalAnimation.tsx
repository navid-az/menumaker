//hooks (animations)
import { useRippleAnimation } from "./useRippleAnimation";
import { useTactileAnimation } from "./useTactileAnimation";

//types
import { RefObject } from "react";
import { RippleAnimationConfig } from "./useRippleAnimation";
import { TactileAnimationConfig } from "./useTactileAnimation";
export type AnimationVariant = "ripple" | "tactile" | "pulse";
type AnimationType =
  | AnimationVariant
  | { animation: "ripple"; config?: RippleAnimationConfig }
  | { animation: "tactile"; config?: TactileAnimationConfig };

function useConditionalAnimation(
  buttonRef: RefObject<HTMLButtonElement>,
  animationVariants: AnimationType[]
) {
  if (Array.isArray(animationVariants)) {
    animationVariants.forEach((animation) => {
      if (typeof animation === "string") {
        switch (animation) {
          case "ripple":
            useRippleAnimation(buttonRef, {});
            break;
          case "tactile":
            useTactileAnimation(buttonRef, {});
            break;
          // Add more cases for other animation names
          default:
            break;
        }
      } else {
        // Handle animation objects with configurations
        const { animation: animName, config } = animation;
        switch (animName) {
          case "ripple":
            useRippleAnimation(buttonRef, config!);
            break;
          case "tactile":
            useTactileAnimation(buttonRef, config!);
            break;
          // Add more cases for other animation names
          default:
            break;
        }
      }
    });
  }
}

export default useConditionalAnimation;
