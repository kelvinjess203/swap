import { ChainIdEnum, listNetwork } from "config/networks";

export function getExplorerLink(
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown",
  chainId: ChainIdEnum
): string {
  switch (type) {
    case "transaction": {
      return `${listNetwork[chainId].blockExplorerUrls}/tx/${data}`;
    }
    case "token": {
      return `${listNetwork[chainId].blockExplorerUrls}/token/${data}`;
    }
    case "block": {
      return `${listNetwork[chainId].blockExplorerUrls}/block/${data}`;
    }
    case "countdown": {
      return `${listNetwork[chainId].blockExplorerUrls}/block/countdown/${data}`;
    }
    default: {
      return `${listNetwork[chainId].blockExplorerUrls}/address/${data}`;
    }
  }
}
