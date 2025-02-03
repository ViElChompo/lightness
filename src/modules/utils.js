import * as convert from "color-convert";
export function hexToHsl(hex) {
  const hsl = convert.hex.hsl(hex);
  return hsl;
}
export const isHexColor = (hex) => /^#[0-9A-F]{6}$/i.test(hex);
export function generatePalette(hex) {
    const palettes = [];
    const [h, s] = hexToHsl(hex);
  
    for (let i = 0; i <= 100; i += 10) {
      palettes.push([h, s, i]);
    }
  
    return palettes;
  }
  
  