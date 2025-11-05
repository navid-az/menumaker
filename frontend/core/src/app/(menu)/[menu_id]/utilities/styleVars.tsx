export function generateStyleVars(
  colors: string[],
  globalBorderRadius: string
) {
  const [primary, secondary, tertiaryMaybe, bgMaybe] = colors;
  const hasTertiary = Boolean(tertiaryMaybe);

  // Fallback color logic
  const tertiary = tertiaryMaybe || secondary;
  const background = bgMaybe || "#FFFFFF";

  return {
    /* Base Palette */
    "--primary": primary,
    "--secondary": secondary,
    "--tertiary": tertiary,
    "--bg": background,

    /* Semantic Roles */
    "--surface-main": hasTertiary ? tertiary : primary,
    "--surface-alt": hasTertiary ? secondary : primary,
    "--surface-accent": hasTertiary ? tertiary : secondary,
    "--text-main": primary,
    "--text-alt": secondary,

    /* Add to Cart Button */
    "--cart-btn-bg": hasTertiary ? tertiary : secondary,
    "--cart-btn-text": hasTertiary ? secondary : primary,
    "--cart-counter-bg": hasTertiary ? secondary : primary,
    "--cart-counter-text": hasTertiary ? tertiary : secondary,

    /* Waiter Call Button */
    "--waiter-btn-bg": hasTertiary ? tertiary : primary,
    "--waiter-btn-text": secondary,

    /* Search Button */
    "--search-btn-bg": hasTertiary ? tertiary : secondary,
    "--search-btn-text": hasTertiary ? secondary : primary,

    /* Footer Cart */
    "--footer-cart-bg": hasTertiary ? tertiary : primary,
    "--footer-cart-text": secondary,
    "--footer-cart-counter-bg": secondary,
    "--footer-cart-counter-text": hasTertiary ? tertiary : primary,

    /* Border Radius System */
    ...getRadiusVars(globalBorderRadius),
  } as const;
}

/* Helper for radius mapping */
function getRadiusVars(radius: string) {
  const map = {
    sm: {
      "--radius-base": "4px",
      "--radius-inner": "3px",
      "--radius-inner-alt": "2px",
      "--radius-exception": "4px",
      "--radius-sm": "0.5rem",
      "--radius-md": "0.5rem",
      "--radius-lg": "0.5rem",
      "--radius-preview": "0.5rem",
    },
    md: {
      "--radius-base": "10px",
      "--radius-inner": "6px",
      "--radius-inner-alt": "6px",
      "--radius-exception": "8px",
      "--radius-sm": "1rem",
      "--radius-md": "2rem",
      "--radius-lg": "2rem",
      "--radius-preview": "1rem",
    },
    lg: {
      "--radius-base": "14px",
      "--radius-inner": "12px",
      "--radius-inner-alt": "10px",
      "--radius-exception": "18px",
      "--radius-sm": "3rem",
      "--radius-md": "5rem",
      "--radius-lg": "6rem",
      "--radius-preview": "1.5rem",
    },
    full: {
      "--radius-base": "9999px",
      "--radius-inner": "9999px",
      "--radius-inner-alt": "9999px",
      "--radius-exception": "24px",
      "--radius-sm": "4rem",
      "--radius-md": "7rem",
      "--radius-lg": "8rem",
      "--radius-preview": "2.5rem",
    },
  };
  return map[radius as keyof typeof map] || map.full;
}
