import { ElementType, ReactNode } from "react";
import { LayoutProps, SpaceProps } from "styled-system";
import { PolymorphicComponentProps } from "utils/polymorphic";

export const variants = {
  PRIMARY: "primary",
  PRIMARY_CONTRAST: "primary-contrast",
  PRIMARY_OUTLINE: "primary-outline",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
  TEXT: "text",
  DANGER: "danger",
  SUBTLE: "subtle",
  SUCCESS: "success",
  LIGHT: "light",
} as const;

export type Variant = typeof variants[keyof typeof variants];

export interface BaseButtonProps extends LayoutProps, SpaceProps {
  as?: "a" | "button" | ElementType;
  external?: boolean;
  isLoading?: boolean;
  variant?: Variant;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export type ButtonProps<P extends ElementType = "button"> =
  PolymorphicComponentProps<P, BaseButtonProps>;
