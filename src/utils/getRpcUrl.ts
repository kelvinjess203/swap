import { CHAIN_ID } from "config/env";
import { ChainIdEnum, listNetwork } from "config/networks";

export const getRpcUrl = (chainID: ChainIdEnum = CHAIN_ID) => {
  return listNetwork[chainID].rpcCollections[0];
};

export const getBlockchainRpcs = (): { [chainId in ChainIdEnum]?: string } => {
  return Object.values(ChainIdEnum).reduce((memo, chainID) => {
    memo[chainID] = listNetwork[chainID]?.rpcCollections[0];
    return memo;
  }, {});
};
