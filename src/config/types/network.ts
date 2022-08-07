export type Network = {
  code: string;
  chainId: number;
  rpcCollections?: string[];
  blockExplorerUrls?: string;
  blockExplorerName?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  networkInfo: {
    icon: string;
    displayName: string;
    shortName: string;
  };
};
