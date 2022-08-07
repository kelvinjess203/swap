import React from 'react'

import Text from 'components/Text'
import Link from 'components/Link'
import truncateHash from 'utils/truncateHash'
import { CHAIN_ID } from 'config/env'
import { ChainIdEnum, listNetwork } from 'config/networks'
import { getExplorerLink } from 'utils/getExplorerLink'

interface DescriptionWithTxProps {
  description?: string
  txHash?: string
  title?: string
  href?: string
  chainId?: ChainIdEnum
  children?: React.ReactNode
}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ txHash, children, title, href, chainId = CHAIN_ID }) => {
  return (
    <>
      {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
      {txHash && (
        <Link external href={href || getExplorerLink(txHash, 'transaction', chainId)}>
          {title || `View on ${listNetwork[chainId].blockExplorerName}`}: {truncateHash(txHash, 8, 0)}
        </Link>
      )}
    </>
  )
}

export default DescriptionWithTx
