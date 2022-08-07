import { createAction } from "@reduxjs/toolkit";
import { BridgeAnyswapData } from "./reducer";

export const updateBridgeData = createAction<{
  anyswapData: BridgeAnyswapData;
}>("bridge/updateBridgeData");
