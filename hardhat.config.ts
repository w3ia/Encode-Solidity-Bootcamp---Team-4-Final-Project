import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY
const INFURA_API_KEY = process.env.INFURA_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const INFURA_API_SECRET = process.env.INFURA_API_SECRET


const config: HardhatUserConfig = {
  paths: { tests: "tests" },
  solidity: "0.8.17",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
 /* networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/"+INFURA_API_KEY,
      accounts: [PRIVATE_KEY]
    }
  }*/
};

export default config;
