import { FAST_INTERVAL, SLOW_INTERVAL } from "config";
import { useAppDispatch, useAppSelector } from "state/store";
import useSWR from "swr";
import { simpleRpcProvider } from "utils/getProviders";
import { setBlock } from ".";

const REFRESH_BLOCK_INTERVAL = 6000;

export const usePollBlockNumber = () => {
  const dispatch = useAppDispatch();

  const { data } = useSWR(
    ["blockNumber"],
    async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber();
      dispatch(setBlock(blockNumber));
      return blockNumber;
    },
    {
      refreshInterval: REFRESH_BLOCK_INTERVAL,
    }
  );

  useSWR(
    [FAST_INTERVAL, "blockNumber"],
    async () => {
      return data;
    },
    {
      refreshInterval: FAST_INTERVAL,
    }
  );

  useSWR(
    [SLOW_INTERVAL, "blockNumber"],
    async () => {
      return data;
    },
    {
      refreshInterval: SLOW_INTERVAL,
    }
  );
};

export const useBlock = () => {
  return useAppSelector((state) => state.block);
};

export const useCurrentBlock = () => {
  return useAppSelector((state) => state.block.currentBlock);
};

export const useInitialBlock = () => {
  return useAppSelector((state) => state.block.initialBlock);
};
