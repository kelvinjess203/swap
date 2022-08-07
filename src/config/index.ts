import { ChainIdEnum, listNetwork } from "./networks";
import JSBI from "jsbi";
import { CHAIN_ID } from "./env";

export const NATIVE_TOKEN_ID = "NATIVE";

export const UINT256_MAX =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const NETWORK = listNetwork[CHAIN_ID];

export const EXPLORER_URL = listNetwork[CHAIN_ID].blockExplorerUrls;

export const FAST_INTERVAL = 10000;
export const SLOW_INTERVAL = 60000;

export enum SolidityType {
  uint8 = "uint8",
  uint256 = "uint256",
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt("0xff"),
  [SolidityType.uint256]: JSBI.BigInt(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  ),
};

export const CHART_PAGE_URL: { [chainId in ChainIdEnum]?: string } = {
  [ChainIdEnum.AVAX_MAINNET]: "https://dexscreener.com/avalanche",
};
