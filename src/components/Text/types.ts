import { LayoutProps, Scale, SpaceProps, TypographyProps } from "styled-system";

export const textScales = {
  xs: "xs",
  md: "md",
  lg: "lg",
  xl: "xl",
  xxl: "xxl",
  xxxl: "xxxl",
} as const;

export type Scales = typeof textScales[keyof typeof textScales];

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps {
  color?: string;
  fontSize?: string;
  bold?: boolean;
  ellipsis?: number;
  scale?: Scales;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}
