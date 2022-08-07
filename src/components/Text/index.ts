import styled, { DefaultTheme } from "styled-components";
import { space, typography, layout } from "styled-system";
import { textScales, TextProps } from "./types";

interface ThemeProps extends TextProps {
  theme: DefaultTheme;
}

const styleScaleText = {
  [textScales.xs]: {
    fontSize: "10px",
    fontSizeXs: "12px",
    fontSizeMd: "12px",
  },
  [textScales.md]: {
    fontSize: "12px",
    fontSizeXs: "14px",
    fontSizeMd: "14px",
  },
  [textScales.lg]: {
    fontSize: "14px",
    fontSizeXs: "15px",
    fontSizeMd: "16px",
  },
  [textScales.xl]: {
    fontSize: "14px",
    fontSizeXs: "16px",
    fontSizeMd: "18px",
  },
  [textScales.xxl]: {
    fontSize: "16px",
    fontSizeXs: "18px",
    fontSizeMd: "22px",
  },

  [textScales.xxxl]: {
    fontSize: "20px",
    fontSizeXs: "22px",
    fontSizeMd: "24px",
  },
};

const getColor = ({ color, theme }: ThemeProps) => theme.colors[color] || color;

const Text = styled.div<TextProps>`
  color: ${getColor};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  font-size: ${({ scale, fontSize }) =>
    fontSize || styleScaleText[scale].fontSize};

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: ${({ scale, fontSize }) =>
      fontSize || styleScaleText[scale].fontSizeXs};
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ scale, fontSize }) =>
      fontSize || styleScaleText[scale].fontSizeMd};
  }

  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}

  ${({ ellipsis }) =>
    ellipsis > 0 &&
    `overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${ellipsis};
    -webkit-box-orient: vertical;`}

  ${space}
  ${typography}
  ${layout}
`;

Text.defaultProps = {
  color: "text",
  scale: textScales.md,
};

export default Text;
