import govJson from "../assets/DiplomaGuildGov.json";
import ftJson from "../assets/MarkingToken.json";
import nftJson from "../assets/DiplomaGuildNFT.json";
import tlJson from "../assets/DiplomaGuildTimeLock.json";
import proJson from "../assets/DiplomaGuildProps.json";

const GOV_CONTRACT_ADDRESS = "0x04a1239B94779B7Ab1fe73D8D8a56b1f0Ff652ED";
const FT_CONTRACT_ADDRESS = "0x93530f913232EC2D46daE425E163fBc8eCC399c3";
const NFT_CONTRACT_ADDRESS = "0xa4a229194FfB476803543f5f31df870ADb424E3F";
const TL_CONTRACT_ADDRESS = "0xA2A60855DA9dd518E84937db9a2ed5b9b673d8A8";
const PRO_CONTRACT_ADDRESS = "0x7b5Cd75A5827DE6D974C308E63ecB10e8DFec5fC";

const GOV_ABI = govJson.abi;
const FT_ABI = ftJson.abi;
const NFT_ABI = nftJson.abi;
const TL_ABI = tlJson.abi;
const PRO_ABI = proJson.abi;

export {
  GOV_CONTRACT_ADDRESS,
  FT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  TL_CONTRACT_ADDRESS,
  PRO_CONTRACT_ADDRESS,
  GOV_ABI,
  FT_ABI,
  NFT_ABI,
  TL_ABI,
  PRO_ABI,
};
