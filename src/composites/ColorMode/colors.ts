export interface ColorPalette {
  severe: string;
  high: string;
  elevated: string;
  guarded: string;
  low: string;
}

export interface ColorPaletteWithTypes {
  background: ColorPalette;
  font: ColorPalette;
  badge: ColorPalette;
}

export const normalPalette: ColorPaletteWithTypes = {
  background: {
    severe: "#f3000d80",
    high: "#ff8c0080", 
    elevated: "#ffee0080",
    guarded: "#008ff580",
    low: "#00a43380"
  },
  font: {
    severe: "red",
    high: "orange",
    elevated: "yellow",
    guarded: "#0671CE",
    low: "green"
  },
  badge: {
    severe: "#CD161C",
    high: "#CC4E00",
    elevated: "#9E6C00",
    guarded: "#1D4EC6",
    low: "green"
  }
};

export const colorBlindPalette: ColorPaletteWithTypes = {
  background: {
    // Add transparency to keep text/icons readable on badges
    severe: "#DC267F80",    // Magenta
    high: "#FE610080",      // Orange  
    elevated: "#FFB00080",  // Yellow
    guarded: "#785EF080",   // Purple
    low: "#648FFF80"        // Blue
  },
  font: {
    severe: "#0F172A",    // High-contrast neutral for readability
    high: "#0F172A",
    elevated: "#0F172A",
    guarded: "#0F172A",
    low: "#0F172A"
  },
  badge: {
    severe: "#DC267F",    // Magenta
    high: "#FE6100",      // Orange  
    elevated: "#FFB000",  // Yellow
    guarded: "#785EF0",   // Purple
    low: "#648FFF"        // Blue
  }
};

export type ColorMode = 'normal' | 'colorblind';

export function getPalette(mode: ColorMode): ColorPaletteWithTypes {
  return mode === 'colorblind' ? colorBlindPalette : normalPalette;
}
