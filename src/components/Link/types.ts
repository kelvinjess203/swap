import { AnchorHTMLAttributes } from "react";
import { TextProps } from "../Text/types";

export interface LinkProps extends TextProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  hideIcon?: boolean;
}
