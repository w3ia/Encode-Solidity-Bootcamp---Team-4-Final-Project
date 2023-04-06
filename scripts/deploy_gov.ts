import { 
    DiplomaGuildGov, 
    DiplomaGuildGov__factory, 
    DiplomaGuildTimeLock, 
    DiplomaGuildTimeLock__factory,
  
  } from "../typechain-types";
import { ethers } from "hardhat";
import * as dotenv from 'dotenv';

dotenv.config();

// CONNECT SEPOLIA
const provider = new ethers.providers.EtherscanProvider('sepolia', 'XCN34W2YDBH64KUSC86FVF6X2XIGYKG2UY')

const MARKING_TOKEN_ADDRESS = "0x93530f913232EC2D46daE425E163fBc8eCC399c3";
const TIMELOCK_TOKEN_ADDRESS = "0xA2A60855DA9dd518E84937db9a2ed5b9b673d8A8";

async function main() {
    // GET ACCOUNTS
    // Joshua
    const Joshua_Pk = process.env.PRIVATE_KEY_JOSHUA;
    if(!Joshua_Pk || Joshua_Pk.length <= 0) throw new Error("Missing environment: private key for Joshua");
    const walletJoshua = new ethers.Wallet(Joshua_Pk);
    console.log(`Connected to Joshua's wallet address: ${walletJoshua.address}`);
    const signerJoshua = walletJoshua.connect(provider);

    // 4. DEPLOY GOVERNOR
    // -------
    console.log("Deploying governor contract!");
    const govCF = new DiplomaGuildGov__factory(signerJoshua);
    const govC: DiplomaGuildGov = await govCF.deploy(MARKING_TOKEN_ADDRESS, TIMELOCK_TOKEN_ADDRESS);
    await govC.deployTransaction.wait();
    console.log(`The Governor contract was deployed at the address ${govC.address}`);

    const timelockCF = new DiplomaGuildTimeLock__factory(signerJoshua)
    console.log("Attaching to contract ...");
    const timelockC: DiplomaGuildTimeLock = timelockCF.attach(TIMELOCK_TOKEN_ADDRESS);
    console.log(`Attached to timelock contract at ${timelockC.address}`);

    // SET TIMELOCK ROLE WITH GOV ADDRESS
    await timelockC.grantRole(await timelockC.EXECUTOR_ROLE(), govC.address);
    await timelockC.grantRole(await timelockC.PROPOSER_ROLE(), govC.address);
    console.log("Timelock roles reset!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});