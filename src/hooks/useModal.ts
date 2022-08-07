import React, { useCallback, useContext, useEffect } from "react";
import get from "lodash/get";
import { ContextModal } from "contexts/ModalContext";

const useModal = (
  modal: React.ReactNode | any,
  closeOnOverlayClick = true,
  updateOnPropsChange = false,
  modalId = "defaultNodeId"
): [<T = any>(data?: T) => void, () => void] => {
  const {
    isOpen,
    nodeId,
    modalNode,
    setModalNode,
    onPresent,
    onDismiss,
    setCloseOnOverlayClick,
  } = useContext(ContextModal);
  const onPresentCallback = useCallback(
    <T = any>(data?: T) => {
      onPresent(modal, modalId, data);
    },
    [modal, modalId, onPresent]
  );

  useEffect(() => {
    if (updateOnPropsChange && isOpen && nodeId === modalId) {
      const modalProps = get(modal, "props");
      const oldModalProps = get(modalNode, "props");

      if (
        modalProps &&
        oldModalProps &&
        JSON.stringify(modalProps) !== JSON.stringify(oldModalProps)
      ) {
        setModalNode(modal);
      }
    }
  }, [
    updateOnPropsChange,
    nodeId,
    modalId,
    isOpen,
    modal,
    modalNode,
    setModalNode,
  ]);

  useEffect(() => {
    setCloseOnOverlayClick(closeOnOverlayClick);
  }, [closeOnOverlayClick, setCloseOnOverlayClick]);

  return [onPresentCallback, onDismiss];
};

export default useModal;
