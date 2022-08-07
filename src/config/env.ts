import { ChainIdEnum } from "./networks";

export const CHAIN_ID =
  parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10) || ChainIdEnum.AVAX_MAINNET;
