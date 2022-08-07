/* eslint-disable import/no-anonymous-default-export */
import { Colors } from "./types";

export const baseColors = {
  failure: "#ed4b6b",
  primary: "#0077fb",
  primaryBright: "#53DEE9",
  primaryDark: "#0098A1",
  secondary: "#FFB237",
  success: "#31D0AA",
  warning: "#FFB237",
};

const colors: Colors = {
  ...baseColors,

  background: "#FFF",
  backgroundAlt: "#252736",
  input: "#ddd",

  text: "#fff",
  textDisabled: "#666171",
  textSubtle: "#969dad",

  disabled: "#524B63",
  button: "#FFF",

  gradients: {
    primary: `linear-gradient(to left, #0077fb, #0077fb)`,
  },
};

export default {
  ...colors,
};
