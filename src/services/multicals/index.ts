import { Interface } from "@ethersproject/abi";
import lodash from "lodash";

import { CHAIN_ID } from "config/env";
import { getMulticallContract } from "services/contracts/helper";

export interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

export interface MulticallOptions {
  requireSuccess?: boolean;
}

export const multicall = async <T = any>(
  abi: any[],
  calls: Call[]
): Promise<T> => {
  const multi = getMulticallContract();
  const itf = new Interface(abi);

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));
  const { returnData } = await multi.aggregate(calldata);

  const res = returnData.map((call, i) =>
    itf.decodeFunctionResult(calls[i].name, call)
  );

  return res as any;
};

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 * 
  array.map(item => (
    {
      address: "0x0000..."
      method: "approve",
      params: []
    }
  ))
 */
export const multicallv2 = async <T = any>(
  abi: any[],
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true },
  chainId = CHAIN_ID
): Promise<T> => {
  const { requireSuccess } = options;
  const multi = getMulticallContract(null, chainId);
  const itf = new Interface(abi);

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));
  const returnData = await multi.tryAggregate(requireSuccess, calldata);
  const res = returnData.map((call, i) => {
    const [result, data] = call;
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null;
  });

  return res as any;
};

/*
  array.map(item => [
    {
      address: "0x0000..."
      method: "approve",
      params: []
    },
    {
      address: "0x0000..."
      method: "transfer",
      params: [0x00000]
    }
  ])
*/
export const multicallWithFields = async (
  calls: [Call[]],
  abi: any[],
  chainID: number = CHAIN_ID
) => {
  const chunkSize = calls.flat().length / calls.length;
  const callsAggregatedCalls = calls
    .filter((poolsCall) => poolsCall[0] !== null && poolsCall[1] !== null)
    .flat();

  const callsMultiCallResult = await multicallv2(
    abi,
    callsAggregatedCalls,
    {},
    chainID
  );
  const callsChunkedResultRaw = lodash.chunk(callsMultiCallResult, chunkSize);

  return calls.map((call, idx) => {
    if (call[0] === null && call[1] === null) {
      return [null, null];
    }
    const data = callsChunkedResultRaw[idx];
    return data;
  });
};

export const multicalAPI = async (
  requests: { request: Promise<any>; key: any }[]
) => {
  const result: { key: any; value: any }[] = [];

  for (let index = 0; index < requests.length; index++) {
    const { key, request } = requests[index];
    const dataAwait = await request;
    result.push({
      key: key,
      value: dataAwait,
    });
  }

  return result;
};
