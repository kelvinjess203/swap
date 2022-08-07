import fs from "fs";
import os from "os";

const mapTypeValue = {
  uint256: "BigNumber",
  uint8: "number",
  address: "string",
  bool: "boolean",
  string: "string",
};

const urlABI = "src/config/abis";
const urlTYPE = urlABI + "/types";
const nameFile = "Anyswapv4Router";

const readFileABI = async () => {
  const dataABI = await fs.readFile(
    `${urlABI}/${nameFile}.json`,
    (error, data) => {
      const parse = JSON.parse(data.toString());
      const types = parse
        .map((item) => {
          if (!item?.name || item?.type !== "function") return;

          const haveOutputs = item?.outputs?.length > 1;
          return `${[item.name]}(${item.inputs
            ?.map((input) => {
              const _type = mapTypeValue[input.type];
              return `${input.name ? `${input.name}: ${_type}` : _type}`;
            })
            .join(", ")}${
            item.inputs?.length > 0 ? ", " : ""
          }overrides?: CallOverrides): Promise<${haveOutputs ? "[" : ""}${
            haveOutputs
              ? item.outputs
                  ?.map((output) => mapTypeValue[output?.type])
                  .join(", ")
              : mapTypeValue[item.outputs?.[0]?.type] || "PopulatedTransaction"
          }${haveOutputs ? "]" : ""}>`;
        })
        .filter((item) => item);

      const mapTypes = `
        import { BaseContract, CallOverrides, PopulatedTransaction } from "ethers";
        import { BigNumber } from "bignumber.js";

        export interface ${nameFile} extends BaseContract {
          functions: {
            ${types.join(";\n\n")}
          }
        }
      `;
      fs.writeFile(`${urlTYPE}/${nameFile}.ts`, mapTypes + os.EOL, (err) => {
        if (err) throw err;
        console.info(` ✅ - ${nameFile}.json has been updated!`);
      });
    }
  );
};

readFileABI();
