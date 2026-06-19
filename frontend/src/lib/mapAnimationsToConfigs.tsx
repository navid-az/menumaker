// Types
import { type AnimationVariantType } from "@/components/global/InteractiveWrapper";
import { type AnimationConfigType } from "@/components/global/InteractiveWrapper";

// Function to map selected animations to their configs
const mapAnimationsToConfigs = (
  configs: AnimationConfigType,
  selectedAnimations?: AnimationVariantType[] | null
): AnimationConfigType => {
  const animationsConfig: AnimationConfigType = {};
  if (Array.isArray(selectedAnimations)) {
    selectedAnimations.forEach((animation) => {
      if (configs[animation]) {
        animationsConfig[animation] = configs[animation];
      }
    });
  }
  return animationsConfig;
};

export default mapAnimationsToConfigs;
