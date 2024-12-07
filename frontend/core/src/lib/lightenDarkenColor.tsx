//lighten/darken hex color code according to the amount
const lightenDarkenColor = (color: string): string => {
  // Ensure the input is a valid hex color
  if (!/^#?[0-9A-Fa-f]{6}$/.test(color)) {
    throw new Error("Invalid HEX color.");
  }

  // Remove the hash (#) if it exists
  let usePound = false;
  if (color.startsWith("#")) {
    color = color.slice(1);
    usePound = true;
  }

  // Parse RGB values
  let r = parseInt(color.slice(0, 2), 16);
  let g = parseInt(color.slice(2, 4), 16);
  let b = parseInt(color.slice(4, 6), 16);

  // Calculate perceived brightness
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // Adjust dynamically based on brightness
  const amount = brightness > 128 ? -140 : 140; // Darken if bright, lighten if dark

  // Modify RGB values
  r = Math.min(255, Math.max(0, r + amount));
  g = Math.min(255, Math.max(0, g + amount));
  b = Math.min(255, Math.max(0, b + amount));

  // Convert back to HEX and ensure 2-character padding
  const hex = (value: number) => value.toString(16).padStart(2, "0");
  const result = `${hex(r)}${hex(g)}${hex(b)}`;

  return usePound ? `#${result}` : result;
};

// function lightenDarkenColor(hexColor, threshold = 0.5) {
//   const hex = hexColor.replace("#", "");
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);

//   const luminance = (channel) => {
//     const normalized = channel / 255;
//     return normalized <= 0.03928
//       ? normalized / 12.92
//       : Math.pow((normalized + 0.055) / 1.055, 2.4);
//   };

//   const l =
//     0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b);

//   // Adjust brightness based on the threshold
//   return l > threshold ? "#000000" : "#FFFFFF";
// }

// function lightenDarkenColor(hexColor) {
//   // Helper: Convert HEX to RGB
//   const hexToRgb = (hex) => {
//     const r = parseInt(hex.substring(0, 2), 16);
//     const g = parseInt(hex.substring(2, 4), 16);
//     const b = parseInt(hex.substring(4, 6), 16);
//     return { r, g, b };
//   };

//   // Helper: Convert RGB to HSL
//   const rgbToHsl = ({ r, g, b }) => {
//     r /= 255;
//     g /= 255;
//     b /= 255;

//     const max = Math.max(r, g, b);
//     const min = Math.min(r, g, b);
//     const delta = max - min;

//     let h = 0;
//     let s = 0;
//     const l = (max + min) / 2;

//     if (delta !== 0) {
//       s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
//       if (max === r) h = ((g - b) / delta) % 6;
//       else if (max === g) h = (b - r) / delta + 2;
//       else h = (r - g) / delta + 4;
//     }

//     h = Math.round(h * 60);
//     if (h < 0) h += 360;

//     return { h, s, l };
//   };

//   // Helper: Convert HSL to HEX
//   const hslToHex = ({ h, s, l }) => {
//     const hueToRgb = (p, q, t) => {
//       if (t < 0) t += 1;
//       if (t > 1) t -= 1;
//       if (t < 1 / 6) return p + (q - p) * 6 * t;
//       if (t < 1 / 2) return q;
//       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//       return p;
//     };

//     const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//     const p = 2 * l - q;

//     const r = Math.round(hueToRgb(p, q, h / 360 + 1 / 3) * 255);
//     const g = Math.round(hueToRgb(p, q, h / 360) * 255);
//     const b = Math.round(hueToRgb(p, q, h / 360 - 1 / 3) * 255);

//     return `#${r.toString(16).padStart(2, "0")}${g
//       .toString(16)
//       .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
//   };

//   // Main logic
//   const { r, g, b } = hexToRgb(hexColor.replace("#", ""));
//   const { h, s, l } = rgbToHsl({ r, g, b });

//   const newLightness = l > 0.5 ? l - 0.25 : l + 0.25; // Adjust lightness
//   return hslToHex({ h, s, l: newLightness });
// }

export default lightenDarkenColor;
