import { TransactionResponse } from '@ethersproject/providers'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { addTransaction } from './actions'
import { TransactionDetails } from './reducer'
import { CHAIN_ID } from 'config/env'
import { ChainIdEnum } from 'config/networks'
import { useAppDispatch, useAppSelector } from 'state/store'

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: {
    summary?: string
    approval?: { tokenAddress: string; spender: string }
    claim?: { recipient: string }
  },
  chainId?: ChainIdEnum,
) => void {
  const { account } = useActiveWeb3React()
  const dispatch = useAppDispatch()

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        approval,
        claim,
      }: { summary?: string; claim?: { recipient: string }; approval?: { tokenAddress: string; spender: string } } = {},
      chainId = CHAIN_ID,
    ) => {
      if (!account) return
      if (!chainId) return

      const { hash } = response
      if (!hash) {
        throw Error('No transaction hash found.')
      }
      dispatch(addTransaction({ hash, from: account, chainId, approval, summary, claim }))
    },
    [dispatch, account],
  )
}

// returns all the transactions for the current chain
export function useAllTransactions(chainId: ChainIdEnum): { [txHash: string]: TransactionDetails } {
  const state = useAppSelector((s) => s.transactions)

  return chainId ? state[chainId] ?? {} : {}
}

export function useTransaction(txHash: string, chainId = CHAIN_ID): TransactionDetails {
  const state = useAppSelector((s) => s.transactions)

  return chainId && state[chainId] ? state[chainId][txHash] ?? null : null
}

export function useIsTransactionPending(transactionHash?: string, chainId = CHAIN_ID): boolean {
  const transactions = useAllTransactions(chainId)

  if (!transactionHash || !transactions[transactionHash]) return false

  return !transactions[transactionHash].receipt
}

// returns all the transactions for the current chain
export function useAllMultichainTransactions(): TransactionDetails[] {
  const state = useAppSelector((s) => s.transactions)

  const transactions = useMemo(() => {
    let allTxns = []
    Object.keys(state).forEach((item) => {
      allTxns = allTxns.concat(Object.values(state[item]))
    })
    return allTxns
  }, [state])

  return transactions
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(
  tokenAddress: string | undefined,
  spender: string | undefined,
  chainId = CHAIN_ID,
): boolean {
  const allTransactions = useAllTransactions(chainId)
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        }
        const { approval } = tx
        if (!approval) return false
        return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx)
      }),
    [allTransactions, spender, tokenAddress],
  )
}

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

// calculate pending transactions
export function usePendingTransactions(chainId = CHAIN_ID): { hasPendingTransactions: boolean; pendingNumber: number } {
  const allTransactions = useAllTransactions(chainId)
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
  const hasPendingTransactions = !!pending.length

  return {
    hasPendingTransactions,
    pendingNumber: pending.length,
  }
}
