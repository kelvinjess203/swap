import {
  JsonRpcSigner,
  StaticJsonRpcProvider,
  Web3Provider,
} from "@ethersproject/providers";

import { CHAIN_ID } from "config/env";
import { ChainIdEnum } from "config/networks";
import { getBlockchainRpcs, getRpcUrl } from "utils/getRpcUrl";

const RPC_URL = getRpcUrl();
const RPC_URL_CHAIN_IDS = getBlockchainRpcs();
export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL);

export class SimpleRpcProvider {
  private static _simpleRpcProviderMap = {
    [CHAIN_ID]: simpleRpcProvider,
  };

  public static get(chainId: ChainIdEnum) {
    if (!this._simpleRpcProviderMap[chainId]) {
      this._simpleRpcProviderMap[chainId] = new StaticJsonRpcProvider(
        RPC_URL_CHAIN_IDS[chainId]
      );
    }

    return this._simpleRpcProviderMap[chainId];
  }
}

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}
