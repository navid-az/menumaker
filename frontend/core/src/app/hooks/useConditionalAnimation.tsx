//hooks (animations)
import { useRippleAnimation } from "./useRippleAnimation";
import { useTactileAnimation } from "./useTactileAnimation";

//types
export type AnimationVariant = "ripple" | "tactile" | "pulse";

// Custom hook wrapper
//check to see which animations are selected and activate them accordingly
const useConditionalAnimation = (
  buttonRef: React.RefObject<HTMLButtonElement>,
  animationVariants?: AnimationVariant[]
) => {
  if (Array.isArray(animationVariants)) {
    if (animationVariants.includes("ripple")) {
      useRippleAnimation(buttonRef, {});
    }
    if (animationVariants.includes("tactile")) {
      useTactileAnimation(buttonRef, {});
    }
    // ... handle other variants as needed
  }
};

export default useConditionalAnimation;
