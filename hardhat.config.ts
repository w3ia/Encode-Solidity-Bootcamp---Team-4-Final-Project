import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  paths: { tests: "tests" },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/f8YbAUkgt-CWsyicd1hU_O_gcJzMu43m",
      // accounts: [privateKey1, privateKey2, ...]
    }
  },
  mocha: {
    timeout: 40000
  }
};

export default config;
