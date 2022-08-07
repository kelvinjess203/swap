/* eslint-disable import/no-anonymous-default-export */
import { ChainIdEnum } from "./networks";

export default {
  multiCall: {
    [ChainIdEnum.AVAX_TESTNET]: "0x9982d59855FE9e183cb7DAC2Ebb8706D6a3eD0A3",
    [ChainIdEnum.AVAX_MAINNET]: "0x3E8b4ecc94A5A8D7ED0fFed689AC628A0226f2Ab",
    [ChainIdEnum.BSC]: "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B",
    [ChainIdEnum.ETH]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
  },
};
