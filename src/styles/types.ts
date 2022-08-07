export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type Shadows = {
  active: string;
  success: string;
  warning: string;
  focus: string;
  inset: string;
  tooltip: string;
};

export type Gradients = {
  primary: string;
};

export type Spacing = number[];

export type Colors = {
  background: string;
  backgroundAlt: string;
  input: string;

  primary: string;
  secondary: string;
  success: string;
  failure: string;
  warning: string;

  // Button
  disabled: string;
  button: string;

  // Text
  text: string;
  textDisabled: string;
  textSubtle: string;

  // Gradients
  gradients: Gradients;
};

export type Transitions = {
  fast: string;
  medium: string;
};

export type ZIndexs = {
  dropdown: number;
  modal: number;
};

export type Radius = {
  small: string;
};

export interface KelvinJessTheme {
  siteWidth: number;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  transitions: Transitions;
  spacing: Spacing;
  shadows: Shadows;
  colors: Colors;
  radius: Radius;
  zIndexs: ZIndexs;
}
