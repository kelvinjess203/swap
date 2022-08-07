import { BoxProps } from "../Box/types";

export interface ModalTheme {
  background: string;
}

export type Handler = () => void;

export interface InjectedProps {
  onDismiss?: Handler;
}

export interface ModalProps extends InjectedProps, BoxProps {
  title: string;
  closeButton?: boolean;
  onBack?: () => void;
  minWidth?: string;
  bodyPadding?: string;
}
