import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrentBlock } from 'state/block/hooks'
import ToastDescriptionWithTx from 'components/Toast/DescriptionWithTx'
import useToast from 'hooks/useToast'
import { checkedTransaction, finalizeTransaction } from './actions'
import { useAllMultichainTransactions } from './hooks'
import { SimpleRpcProvider } from 'utils/getProviders'
import { useAppDispatch } from 'state/store'

export function shouldCheck(
  currentBlock: number,
  tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number },
): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = currentBlock - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  }
  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  }
  // otherwise every block
  return true
}

export default function Updater(): null {
  const { account } = useActiveWeb3React()

  const currentBlock = useCurrentBlock()

  const dispatch = useAppDispatch()

  const allTxns = useAllMultichainTransactions()

  const { toastError, toastSuccess } = useToast()

  useEffect(() => {
    if (!account || !currentBlock) return

    allTxns
      .filter((txn) => shouldCheck(currentBlock, txn))
      .forEach((txn) => {
        SimpleRpcProvider.get(txn.chainId)
          .getTransactionReceipt(txn.hash)
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId: txn.chainId,
                  hash: txn.hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                }),
              )

              const toast = receipt.status === 1 ? toastSuccess : toastError
              toast(
                'Transaction receipt',
                <ToastDescriptionWithTx txHash={receipt.transactionHash} chainId={txn.chainId} />,
              )
            } else {
              dispatch(checkedTransaction({ chainId: txn.chainId, hash: txn.hash, blockNumber: currentBlock }))
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${txn.hash}`, error)
          })
      })
  }, [allTxns, currentBlock, dispatch, toastSuccess, toastError, account])

  return null
}
