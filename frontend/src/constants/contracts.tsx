import govJson from '../assets/DiplomaGuildGov.json';
import ftJson from '../assets/MarkingToken.json';
import nftJson from '../assets/DiplomaGuildNFT.json';
import tlJson from '../assets/DiplomaGuildTimeLock.json';

const GOV_CONTRACT_ADDRESS = '0xEd10ebDE8833cC088b6565504C7E1Bb019947560';
const FT_CONTRACT_ADDRESS = "0x93530f913232EC2D46daE425E163fBc8eCC399c3";
const NFT_CONTRACT_ADDRESS = "0xa4a229194FfB476803543f5f31df870ADb424E3F";
const TL_CONTRACT_ADDRESS = "0xA2A60855DA9dd518E84937db9a2ed5b9b673d8A8";

const GOV_ABI = govJson.abi;
const FT_ABI = ftJson.abi;
const NFT_ABI = nftJson.abi;
const TL_ABI = tlJson.abi;

export { GOV_CONTRACT_ADDRESS, FT_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, TL_CONTRACT_ADDRESS, GOV_ABI, FT_ABI, NFT_ABI, TL_ABI };