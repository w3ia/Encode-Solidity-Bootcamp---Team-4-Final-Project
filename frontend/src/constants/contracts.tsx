import govJson from '../assets/DiplomaGuildGov.json';
import ftJson from '../assets/MarkingToken.json';
import nftJson from '../assets/DiplomaGuildNFT.json';
import tlJson from '../assets/DiplomaGuildTimeLock.json';

const GOV_CONTRACT_ADDRESS = '0xCb8551084133F0866baf730D276E7e09d70E1140';
const FT_CONTRACT_ADDRESS = "0x66a2F4cdbB32475dFc8a8A631FCae05C8Eb0BaEc";
const NFT_CONTRACT_ADDRESS = "0x68De8545D0f3c8cF41Ec820FDA5211f3072232e1";
const TL_CONTRACT_ADDRESS = "0x5A3b5aB308d1aDAd46aD1b8D54f326752B4B5aAa";

const GOV_ABI = govJson.abi;
const FT_ABI = ftJson.abi;
const NFT_ABI = nftJson.abi;
const TL_ABI = tlJson.abi;

export { GOV_CONTRACT_ADDRESS, FT_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, TL_CONTRACT_ADDRESS, GOV_ABI, FT_ABI, NFT_ABI, TL_ABI };