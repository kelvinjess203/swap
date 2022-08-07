import React from "react";
import styled, { keyframes } from "styled-components";


import Box from "components/Box/Box";
import Flex from "components/Box/Flex";
import IconButton from "components/Button/IconButton";

import ArrowBackIcon from "svgs/back.svg";
import CloseIcon from "svgs/close.svg";

import { ModalProps } from "./types";

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: ${({ theme, background }) =>
    background
      ? theme.colors[background] || background
      : `${theme.colors.primary}55`};
  display: flex;
  padding: 12px 24px;
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalCloseButton: React.FC<{
  onDismiss: ModalProps["onDismiss"];
}> = ({ onDismiss }) => {
  return (
    <IconButton
      variant="text"
      onClick={onDismiss}
      aria-label="Close the dialog"
    >
      <CloseIcon fill="#fff" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"] }> = ({
  onBack,
}) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="#fff" fill="#fff" width="24px" />
    </IconButton>
  );
};

const rise = keyframes`
   from {
        transform: translateY(10px);
        opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
`;

export const ModalContainer = styled(Box) <{ minWidth: string }>`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1),
    0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.radius.small};
  width: 100%;
  max-height: 100vh;
  z-index: ${({ theme }) => theme.zIndexs.modal};

  min-width: 320px;
  max-width: ${({ minWidth }) => minWidth};

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }

  animation: ${rise} 0.2s;
`;
