import { CHAIN_ID } from "config/env";
import addresses from "config/contracts";
import { Address } from "config/types";
import { getAddress } from "@ethersproject/address";

export const getAddressByChain = (address: Address, chainId = CHAIN_ID): string => {
  try {
    return address[chainId] || null;
  } catch {
    return null;
  }
};

export const getMulticallAddress = (chainId = CHAIN_ID) => {
  try {
    return getAddressByChain(addresses.multiCall, chainId) || null;
  } catch {
    return null;
  }
};

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
