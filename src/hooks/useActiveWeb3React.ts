import { useEffect, useState, useRef } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { SimpleRpcProvider } from "utils/getProviders";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { CHAIN_ID } from "config/env";

import { AbstractConnector } from "@web3-react/abstract-connector";
import { useWeb3React } from "@web3-react/core";
import { ChainIdEnum } from "config/networks";

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */

export class Web3ReactContext
  implements Web3ReactContextInterface<Web3Provider>
{
  connector?: AbstractConnector;
  library?: any;
  chainId?: number;
  account?: string;
  active: boolean;
  error?: Error;
  activate: (
    connector: AbstractConnector,
    onError?: (error: Error) => void,
    throwErrors?: boolean
  ) => Promise<void>;
  setError: (error: Error) => void;
  deactivate: () => void;
  isWrongChainId: boolean;
}

const useActiveWeb3React = (
  providerChainId?: ChainIdEnum
): Web3ReactContext => {
  const { library, chainId, account, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(
    library || SimpleRpcProvider.get(providerChainId || CHAIN_ID)
  );

  const isWrongChainId = account && chainId && chainId !== CHAIN_ID;

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(
        library || SimpleRpcProvider.get(providerChainId || CHAIN_ID)
      );
      refEth.current = library;
    }
  }, [library, providerChainId]);

  return {
    isWrongChainId,
    library: provider,
    chainId: CHAIN_ID,
    account,
    ...web3React,
  };
};

export default useActiveWeb3React;
