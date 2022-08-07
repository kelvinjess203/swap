import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { SimpleRpcProvider } from "utils/getProviders";

// Addresses
import { getMulticallAddress } from "utils/addressHelpers";

// ABI
import MultiCallAbi from "config/abis/Multicall.json";
import ERC20Abi from "config/abis/erc20.json";

// Types
import { Multicall } from "config/abis/types";
import { CHAIN_ID } from "config/env";
import { Erc20 } from "config/abis/types/Erc20";

export const getContract = (
  abi: any,
  address: string,
  signer?: Signer | Provider,
  chainId = CHAIN_ID
): Contract => {
  if (!abi) return null;
  const signerOrProvider = signer ?? SimpleRpcProvider.get(chainId);
  return new Contract(address, abi, signerOrProvider);
};

export const getMulticallContract = (
  signer?: Signer | Provider,
  chainId = CHAIN_ID
): Multicall =>
  getContract(
    MultiCallAbi,
    getMulticallAddress(chainId),
    signer,
    chainId
  ) as Multicall;

export const getTokenContract = (
  address: string,
  signer?: Signer | Provider
): Erc20 => getContract(ERC20Abi, address, signer) as Erc20;
