import { ethers, Wallet } from 'ethers';
import { 
    DiplomaGuildGov, 
    DiplomaGuildGov__factory, 
    DiplomaGuildTimeLock, 
    DiplomaGuildTimeLock__factory,
    MarkingToken,
    MarkingToken__factory,
    DiplomaGuildNFT,
    DiplomaGuildNFT__factory
  } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

const MINT_VALUE = ethers.utils.parseEther("10");

// function convertStringArrayToBytes32(array: string[]) {
//     const bytes32Array = [];
//     for (let index = 0; index < array.length; index++) {
//         bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
//     }
//     return bytes32Array;
//   }

async function main () {
    
    // CONNECT SEPOLIA
    const provider = new ethers.providers.AlchemyProvider("sepolia", process.env.ALCHEMY_API_KEY);

    // CONNECT ALL TEAM 4 TEST WALLETS
    // instantiate wallet for Joshua
    const Joshua_Pk = process.env.PRIVATE_KEY_JOSHUA;
    if(!Joshua_Pk || Joshua_Pk.length <= 0) throw new Error("Missing environment: private key for Joshua");
    const walletJoshua = new ethers.Wallet(Joshua_Pk);
    console.log(`Connected to Joshua's wallet address: ${walletJoshua.address}`);
    // instantiate wallet for Hardeep
    const Hardeep_Pk = process.env.PRIVATE_KEY_HARDEEP;
    if(!Hardeep_Pk || Hardeep_Pk.length <= 0) throw new Error("Missing environment: private key for Hardeep");
    const walletHardeep = new ethers.Wallet(Hardeep_Pk);
    console.log(`Connected to Hardeep's wallet address: ${walletHardeep.address}`);
    // instantiate wallet for Chris
    const Chris_Pk = process.env.PRIVATE_KEY_CHRIS;
    if(!Chris_Pk || Hardeep_Pk.length <= 0) throw new Error("Missing environment: private key for Chris");
    const walletChris = new ethers.Wallet(Chris_Pk);
    console.log(`Connected to Chris' wallet address: ${walletChris.address}`);
    // instantiate wallet for Josh
    const Josh_Pk = process.env.PRIVATE_KEY_JOSH;
    if(!Josh_Pk || Josh_Pk.length <= 0) throw new Error("Missing environment: private key for Josh");
    const walletJosh = new ethers.Wallet(Josh_Pk);
    console.log(`Connected to Josh's wallet address: ${walletJosh.address}`);
                    
    // CREATE SIGNERS FROM WALLET
    const signerJoshua = walletJoshua.connect(provider);
    const signerHardeep = walletHardeep.connect(provider);
    const signerChris = walletChris.connect(provider);
    const signerJosh = walletJosh.connect(provider);

    // DEPLOY TOKEN CONTRACT
    const contractFactoryToken = new MarkingToken__factory(signerJoshua);
    const contractToken: MarkingToken = await contractFactoryToken.deploy();
    const deployTransactionReceipt = await contractToken.deployTransaction.wait();
    console.log(`The Tokenized Vote Contract with address ${contractToken.address} was deployed at the block ${deployTransactionReceipt.blockNumber}`);

    // DEPLOY TIMELOCK CONTRACT
    console.log("Deploying voting token contract!");
    const contractFactoryTL = new DiplomaGuildTimeLock__factory(signerJoshua);
    const timelockContract: DiplomaGuildTimeLock = await contractFactoryTL.deploy(0, [walletJoshua.address], [walletJoshua.address], walletJoshua.address);
    const timelockContractReceipt = await timelockContract.deployTransaction.wait();
    console.log(`The Timelock contract was deployed at the address ${timelockContract.address}`);

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});