import { ChainIdEnum } from "config/networks";

export type Address = {
  [chainIdEnum in ChainIdEnum]?: string;
};
