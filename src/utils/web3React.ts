import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";

const POLLING_INTERVAL = 12000;

export const getLibrary = (
  provider: any,
  connector?: Required<Web3ReactContextInterface>["connector"]
): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
