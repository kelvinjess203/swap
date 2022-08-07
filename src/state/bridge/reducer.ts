import { createReducer } from "@reduxjs/toolkit";
import { ChainIdEnum } from "config/networks";
import { updateBridgeData } from "./actions";

export interface BridgeInfo {
  swapFeeRate: number;
  maximumFee: string;
  minimumFee: string;
  maximum: string;
  minimum: string;
  bigValueThresHold: string;
}

export interface BridgeToken {
  actionName: string;
  anyTokenAddress: string;
  router: string;
  toChainInfo: { [chainId in ChainIdEnum]?: BridgeInfo };
}

export type BridgeAnyswapData = {
  [chainId in ChainIdEnum]?: {
    [key: string]: BridgeToken;
  };
};

export interface BridgeState {
  anyswapData?: BridgeAnyswapData | null;
}

const initialState: BridgeState = {
  anyswapData: null,
};

export default createReducer<BridgeState>(initialState, (builder) =>
  builder.addCase(updateBridgeData, (state, { payload: { anyswapData } }) => {
    return {
      ...state,
      anyswapData,
    };
  })
);
