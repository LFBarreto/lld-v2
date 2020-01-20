// @flow

import { WARN_LEGACY_COLORS } from "~/config/constants";

export const space = [0, 5, 10, 15, 20, 30, 40, 50, 70];
export const fontSizes = [8, 9, 10, 12, 13, 16, 18, 22, 32];
export const radii = [0, 4];
export const shadows = ["0 4px 8px 0 rgba(0, 0, 0, 0.03)"];

// Those fonts are now defined in global.css, this is just a mapping for styled-system
export const fontFamilies = {
  Inter: {
    ExtraLight: {
      weight: 100,
      style: "normal",
    },
    Light: {
      weight: 300,
      style: "normal",
    },
    Regular: {
      weight: 400,
      style: "normal",
    },
    Medium: {
      weight: 500,
      style: "normal",
    },
    SemiBold: {
      weight: 600,
      style: "normal",
    },
    Bold: {
      weight: 700,
      style: "normal",
    },
    ExtraBold: {
      weight: 800,
      style: "normal",
    },
  },
};

const colors = {
  transparent: "transparent",
  pearl: "#ff0000",
  alertRed: "#ea2e49",
  warning: "#f57f17",
  black: "#000000",
  dark: "#142533",
  separator: "#aaaaaa",
  fog: "#d8d8d8",
  graphite: "#767676",
  grey: "#999999",
  identity: "#41ccb4",
  lightFog: "#eeeeee",
  sliderGrey: "#F0EFF1",
  lightGraphite: "#fafafa",
  lightGrey: "#f9f9f9",
  starYellow: "#FFD24A",
  orange: "#ffa726",
  positiveGreen: "#66be54",
  greenPill: "#41ccb4",
  smoke: "#666666",
  wallet: "#6490f1",
  blueTransparentBackground: "#6490F138",
  pillActiveBackground: "rgba(100, 144, 241, 0.1)",
  lightRed: "rgba(234, 46, 73, 0.1)",
  white: "#ffffff",
  experimentalBlue: "#165edb",
  marketUp_eastern: "#ea2e49",
  marketUp_western: "#66be54",
  marketDown_eastern: "#6490f1",
  marketDown_western: "#ea2e49",
};

// prettier-ignore
const exportedColors = WARN_LEGACY_COLORS
  ? new Proxy(colors, {
    get: (target, prop) => {
      // eslint-disable-next-line no-console
      console.warn(`Usage of the deprecated legacy color scheme detected ${prop}`)
      return '#FF0000'
    },
  })
  : colors

export { exportedColors as colors };

type Font = {
  weight: number,
  style: string,
};

export type Theme = {
  sizes: {
    topBarHeight: number,
    sideBarWidth: number,
  },
  radii: number[],
  fontFamilies: { [string]: { [string]: Font } },
  fontSizes: number[],
  space: number[],
  shadows: string[],
  colors: { [string]: string },
};

const theme: Theme = {
  sizes: {
    topBarHeight: 58,
    sideBarWidth: 230,
  },
  radii,
  fontFamilies,
  fontSizes,
  space,
  shadows,
  colors,
};

export default theme;
