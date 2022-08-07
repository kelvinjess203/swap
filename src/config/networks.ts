import { Network } from "./types/network";

const path = "images/networks";

type ListNetworkByChainId = {
  [key: string]: Network;
};

export enum ChainIdEnum {
  BSC = 56,
  AVAX_MAINNET = 43114,
  AVAX_TESTNET = 43113,
  FTM = 250,
  ETH = 1,
  AURORA = 1313161554,
}

export const NetworkActive = [
  ChainIdEnum.AVAX_MAINNET,
  ChainIdEnum.AVAX_TESTNET,
];

export const listNetwork: ListNetworkByChainId = {
  [ChainIdEnum.ETH]: {
    code: "ETH",
    chainId: 1,
    rpcCollections: ["https://rpc.ankr.com/eth"],
    blockExplorerUrls: "https://etherscan.io",
    blockExplorerName: "Etherscan",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    networkInfo: {
      displayName: "Ethereum",
      icon: `${path}/eth.png`,
      shortName: "Ethereum",
    },
  },

  [ChainIdEnum.BSC]: {
    code: "BSC",
    chainId: 56,
    rpcCollections: [
      "https://bsc-dataseed.binance.org/",
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/",
    ],
    blockExplorerUrls: "https://bscscan.com",
    blockExplorerName: "Bscscan",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    networkInfo: {
      displayName: "Binance Smart Chain",
      icon: `${path}/bsc.png`,
      shortName: "BSC",
    },
  },

  [ChainIdEnum.AVAX_MAINNET]: {
    code: "AVAX_MAINNET",
    chainId: 43114,
    rpcCollections: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: "https://snowtrace.io",
    blockExplorerName: "Snowtrace",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    networkInfo: {
      displayName: "Avalanche C Chain",
      icon: `${path}/avax.png`,
      shortName: "Avalanche",
    },
  },

  [ChainIdEnum.AVAX_TESTNET]: {
    code: "AVAX_TESTNET",
    chainId: 43113,
    rpcCollections: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: "https://testnet.snowtrace.io",
    blockExplorerName: "Snowtrace (Testnet)",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    networkInfo: {
      displayName: "Avalanche Juji Chain",
      icon: `${path}/avax.png`,
      shortName: "Avalanche",
    },
  },
};
