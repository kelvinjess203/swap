import { CHAIN_ID } from "config/env";
import addresses from "config/contracts";
import { Address } from "config/types";

export const getAddress = (address: Address, chainId = CHAIN_ID): string => {
  return address[chainId];
};

export const getMulticallAddress = (chainId = CHAIN_ID) => {
  return getAddress(addresses.multiCall, chainId);
};

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
