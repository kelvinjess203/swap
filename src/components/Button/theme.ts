import colors from "styles/colors";
import { variants } from "./types";

export const styleVariants = {
  [variants.PRIMARY]: {
    background: colors.button,
    color: "text",
  },
  [variants.PRIMARY_CONTRAST]: {
    background: colors.text,
    color: colors.primary,
  },
  [variants.PRIMARY_OUTLINE]: {
    background: "transparent",
    color: colors.primary,
    border: "1px solid",
    borderColor: "primary",
  },
  [variants.SECONDARY]: {
    backgroundColor: "textSubtle",
    border: "1px solid",
    borderColor: "textSubtle",
    boxShadow: "none",
    color: "text",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
  [variants.SUBTLE]: {
    backgroundColor: "transparent",
    color: "text",
    boxShadow: "none",
  },
  [variants.TERTIARY]: {
    boxShadow: "none",
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    color: "primary",
    boxShadow: "none",
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "text",
    boxShadow: "none",
  },
};
