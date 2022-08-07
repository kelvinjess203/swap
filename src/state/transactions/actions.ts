import { createAction } from "@reduxjs/toolkit";
import { ChainIdEnum } from "config/networks";

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
}

export const addTransaction = createAction<{
  chainId: ChainIdEnum;
  hash: string;
  from: string;
  approval?: { tokenAddress: string; spender: string };
  claim?: { recipient: string };
  summary?: string;
}>("transactions/addTransaction");
export const clearAllTransactions = createAction<{ chainId: ChainIdEnum }>(
  "transactions/clearAllTransactions"
);
export const finalizeTransaction = createAction<{
  chainId: ChainIdEnum;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>("transactions/finalizeTransaction");
export const checkedTransaction = createAction<{
  chainId: ChainIdEnum;
  hash: string;
  blockNumber: number;
}>("transactions/checkedTransaction");
