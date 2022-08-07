import React from 'react'
import Heading from 'components/Heading'

import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from './styles.modal'
import { ModalProps } from './types'

const Modal: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  closeButton = false,
  bodyPadding = ['12px', '12px', '24px'],
  minWidth = '420px',
  ...props
}) => {
  return (
    <ModalContainer minWidth={minWidth} {...props}>
      <ModalHeader >
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Heading>{title}</Heading>
        </ModalTitle>
        {!closeButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  )
}

export default Modal
