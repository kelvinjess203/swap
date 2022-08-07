import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";

import { CHAIN_ID } from "config/env";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { getProviderOrSigner } from "utils/getProviders";
import { getMulticallAddress } from "utils/addressHelpers";

import { getContract } from "./helper";
import { Erc20, Multicall } from "config/abis/types";
import { Erc20ABI, multiCallABI } from "config/abis";

const useContract = <T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
  chainId = CHAIN_ID
): T | null => {
  const { library, account } = useActiveWeb3React(chainId);

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        ABI,
        address,
        withSignerIfPossible ? getProviderOrSigner(library, account) : null,
        chainId
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account, chainId]) as T;
};

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
  chainId = CHAIN_ID
) {
  return useContract<Erc20>(
    tokenAddress,
    Erc20ABI,
    withSignerIfPossible,
    chainId
  );
}

export function useMulticallContract(chainId = CHAIN_ID) {
  return useContract<Multicall>(
    getMulticallAddress(chainId),
    multiCallABI,
    false
  );
}
