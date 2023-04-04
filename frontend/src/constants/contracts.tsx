import lotteryJson from '../assets/Lottery.json';
import lotteryTokenJson from '../assets/LotteryToken.json';

const GOV_CONTRACT_ADDRESS = '0x4c5Ec2E9a3fC3eedE1DA4189B0f0db74eCeB7695';
const FT_CONTRACT_ADDRESS = "0xca25D30F1f2f01Be696AFC5ADA4fbe9FFAea3755";
const NFT_CONTRACT_ADDRESS = "0xca25D30F1f2f01Be696AFC5ADA4fbe9FFAea3755";
const TL_CONTRACT_ADDRESS = "0xca25D30F1f2f01Be696AFC5ADA4fbe9FFAea3755";

const GOV_ABI = lotteryJson.abi;
const FT_ABI = lotteryTokenJson.abi;
const NFT_ABI = lotteryJson.abi;
const TL_ABI = lotteryJson.abi;

export { LOTTERY_CONTRACT_ADDRESS, LOTTERY_TOKEN_ADDRESS, LOTTERY_ABI, LOTTERY_TOKEN_ABI};