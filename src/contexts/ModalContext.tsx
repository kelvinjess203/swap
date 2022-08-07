import Overlay from "components/Overlay";
import React, { createContext, useState } from "react";
import styled from "styled-components";

interface ModalsContext {
  isOpen: boolean;
  nodeId: string;
  modalNode: React.ReactNode;
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  onPresent: (node: React.ReactNode, newNodeId: string, data: any) => void;
  onDismiss: () => void;
  setCloseOnOverlayClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000000000000;
`;
export const ContextModal = createContext<ModalsContext>({
  isOpen: false,
  nodeId: "",
  modalNode: null,
  setModalNode: () => null,
  onPresent: () => null,
  onDismiss: () => null,
  setCloseOnOverlayClick: () => true,
});
const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalNode, setModalNode] = useState<React.ReactNode>();
  const [nodeId, setNodeId] = useState("");
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const [data, setData] = useState(null);

  const handlePresent = (node: React.ReactNode, newNodeId: string, data: any) => {
    setData(data)
    setModalNode(node);
    setIsOpen(true);
    setNodeId(newNodeId);
  };

  const handleDismiss = () => {
    setModalNode(undefined);
    setIsOpen(false);
    setNodeId("");
  };

  const handleOverlayDismiss = () => {
    if (closeOnOverlayClick) {
      handleDismiss();
    }
  };

  return (
    <ContextModal.Provider
      value={{
        isOpen,
        nodeId,
        modalNode,
        setModalNode,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
        setCloseOnOverlayClick,
      }}
    >
      {isOpen && (
        <ModalWrapper>
          <Overlay onClick={handleOverlayDismiss} />
          {React.isValidElement(modalNode) &&
            React.cloneElement(modalNode, {
              onDismiss: handleDismiss,
              data: data
            })}
        </ModalWrapper>
      )}
      {children}
    </ContextModal.Provider>
  );
};

export default ModalProvider;
