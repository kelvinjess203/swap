/* eslint-disable import/no-anonymous-default-export */
import {
  Breakpoints,
  MediaQueries,
  Radius,
  Shadows,
  Spacing,
  ZIndexs,
} from "./types";

// Media
export const breakpointMap: { [key: string]: number } = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xxl: 1200,
};

const breakpoints: Breakpoints = Object.values(breakpointMap).map(
  (breakpoint) => `${breakpoint}px`
);

const mediaQueries: MediaQueries = {
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
};

// Variable
const zIndexs: ZIndexs = {
  dropdown: 10,
  modal: 100,
};

const radius: Radius = {
  small: "4px",
};

const spacing: Spacing = [0, 4, 8, 16, 24, 32, 48, 64];

const shadows: Shadows = {
  active: "0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)",
  success: "0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)",
  warning: "0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)",
  focus: "0 0 3px #2196f3, 0 0 5px #2196f3",
  inset: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
  tooltip:
    "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
};

const transitions = {
  fast: "all 0.2s",
  medium: "all 0.5s",
};

export default {
  siteWidth: 1400,
  radius,
  breakpoints,
  mediaQueries,

  spacing,
  shadows,
  zIndexs,
  transitions,
};
