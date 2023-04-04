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
import { ethers } from "hardhat";
import { mine, time } from "@nomicfoundation/hardhat-network-helpers";
import { Provider } from "@ethersproject/providers";
import { BigNumberish, Signer, Wallet } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as dotenv from 'dotenv';
import { Sign } from "crypto";
dotenv.config();
  
const MINT_VALUE = ethers.utils.parseEther("100");
const diplomaURI = "ipfs://bafkreihqfo2yd4o7fjveg5bptjgaobwqdd7nk7i7l7a6xmm5s25lrzabjm"


// CONNECT SEPOLIA
const provider = new ethers.providers.EtherscanProvider('sepolia', 'XCN34W2YDBH64KUSC86FVF6X2XIGYKG2UY')
  
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------------------------------------------------
// Mint Marking Tokens
async function mintMarkingTokens(address: string, markingToken: MarkingToken) {
    let mintTx = await markingToken.mint(address, MINT_VALUE);
    let mintTxReceipt = await mintTx.wait();
    let tokenBalanceAccount = await markingToken.balanceOf(address);
    console.log(`Account ${address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccount)} Marking Tokens`);
}

// Get voting power
async function getVotingPower(address: string, markingToken: MarkingToken) {
    let votePower = await markingToken.getVotes(address);
    console.log(`Account ${address} has a vote power of ${ethers.utils.formatEther(votePower)} units`);
}

// Delegate tokens
async function delegate(delegator: Wallet, toAddress: string, markingToken: MarkingToken) {
    let delegateTx = await markingToken.connect(delegator).delegate(toAddress);
    let delegateTxReceipt = await delegateTx.wait();
    console.log(`Tokens delegated from ${delegator.address} for ${toAddress}`);
}

// Submit project (proposal)
async function submitProject(DiplomaGuildC: DiplomaGuildNFT, govC: DiplomaGuildGov, projectURL: string, studentAddress: string): Promise<BigNumberish> {
    let transferCalldata = DiplomaGuildC.interface.encodeFunctionData(`safeMint`, [studentAddress, diplomaURI]);

    let proposeTx = await govC.propose(
        [DiplomaGuildC.address],
        [0],
        [transferCalldata],
        projectURL,
    );
    
    let receipt = await proposeTx.wait();
    let propId = receipt.events?.[0]?.args?.proposalId;
    console.log(`Proposal ID is: ${propId}`);

    return propId;
}

// Queue project (proposal)
async function queueProject(DiplomaGuildC: DiplomaGuildNFT, govC: DiplomaGuildGov, projectURL: string, studentAddress: string) {
    let descriptionHash = ethers.utils.id(projectURL);
    let transferCalldata = DiplomaGuildC.interface.encodeFunctionData(`safeMint`, [studentAddress, diplomaURI]);
    
    const queueTx = await govC.queue(
    [DiplomaGuildC.address],
    [0],
    [transferCalldata],
    descriptionHash,
    );
    const queueTxReceipt = await queueTx.wait();
    console.log(`Proposal queued at block: ${queueTxReceipt.blockNumber}`);
}

// Execute project (proposal)
async function executeProject(DiplomaGuildC: DiplomaGuildNFT, govC: DiplomaGuildGov, projectURL: string, studentAddress: string) {
    let descriptionHash = ethers.utils.id(projectURL);
    let transferCalldata = DiplomaGuildC.interface.encodeFunctionData(`safeMint`, [studentAddress, diplomaURI]);
    
    const queueTx = await govC.execute(
    [DiplomaGuildC.address],
    [0],
    [transferCalldata],
    descriptionHash,
    );
    const queueTxReceipt = await queueTx.wait();
    console.log(`Proposal executed at block: ${queueTxReceipt.blockNumber}`);
}

// vote for project
async function vote(voter: Wallet, propId: BigNumberish, govC: DiplomaGuildGov) {
    let voteTx = await govC.connect(voter).castVote(propId, 1);  
    let voteTxReceipt = await voteTx.wait();
    
    // check the state
    let stateAfterVote = await govC.state(propId);
    console.log(`proposal state after account ${voter.address} voted is: ${stateAfterVote}`);
}

async function getProposalEndDate(govC: DiplomaGuildGov, propId: BigNumberish): Promise<Date> {
    // Get block number when proposal expires
    let proposalDeadline = await govC.proposalDeadline(propId);
    // Get the current block number
    let currentBlock = await ethers.provider.getBlockNumber();
    // Work out remaining number of blocks
    let remainingBlocks = proposalDeadline.toNumber() - currentBlock;
    // Assume a 12s block time (this is OpenZepplin Contract wizard default block time), calculate remaining time in seconds
    let remainingTime = remainingBlocks * 12;

    // Get the current date and add the remaining time to calculate the end date
    const endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + remainingTime);
    return endDate;
}
// -----------------------------------------------------------------------------------------------------------------------

async function main() {
    // GET ACCOUNTS
    // Joshua
    const Joshua_Pk = process.env.PRIVATE_KEY_JOSHUA;
    if(!Joshua_Pk || Joshua_Pk.length <= 0) throw new Error("Missing environment: private key for Joshua");
    const walletJoshua = new ethers.Wallet(Joshua_Pk);
    console.log(`Connected to Joshua's wallet address: ${walletJoshua.address}`);
    const signerJoshua = walletJoshua.connect(provider);
    // Hardeep
    const Hardeep_Pk = process.env.PRIVATE_KEY_HARDEEP;
    if(!Hardeep_Pk || Hardeep_Pk.length <= 0) throw new Error("Missing environment: private key for Hardeep");
    const walletHardeep = new ethers.Wallet(Hardeep_Pk);
    console.log(`Connected to Hardeep's wallet address: ${walletHardeep.address}`);
    const signerHardeep = walletHardeep.connect(provider);


    // DEPLOY MARKING TOKEN
    console.log("Deploying marking token contract!");
    const markingCF = new MarkingToken__factory(signerJoshua);
    const markingC: MarkingToken = await markingCF.deploy();
    await markingC.deployTransaction.wait();
    console.log(`The Token contract was deployed at the address ${markingC.address}`);

    // 3. DEPLOY TIMELOCK 
    // -------
    console.log("Deploying time lock contract!");
    const timelockCF = new DiplomaGuildTimeLock__factory(signerJoshua);
    const timelockC: DiplomaGuildTimeLock = await timelockCF.deploy(0, [signerJoshua.address], [signerJoshua.address], signerJoshua.address);
    await timelockC.deployTransaction.wait();
    console.log(`The Timelock contract was deployed at the address ${timelockC.address}`);

    // 4. DEPLOY GOVERNOR
    // -------
    console.log("Deploying governor contract!");
    const govCF = new DiplomaGuildGov__factory(signerJoshua);
    const govC: DiplomaGuildGov = await govCF.deploy(markingC.address, timelockC.address);
    await govC.deployTransaction.wait();
    console.log(`The Governor contract was deployed at the address ${govC.address}`);

    // SET TIMELOCK ROLE WITH GOV ADDRESS
    await timelockC.grantRole(await timelockC.EXECUTOR_ROLE(), govC.address);
    await timelockC.grantRole(await timelockC.PROPOSER_ROLE(), govC.address);
    console.log("Timelock roles reset!");

    // 5. DEPLOY DIPLOMA NFT CONTRACT
    // -------
    console.log("Deploying diploma NFT contract!");
    const DiplomaGuildFC = new DiplomaGuildNFT__factory(signerJoshua);
    const DiplomaGuildC: DiplomaGuildNFT = await DiplomaGuildFC.deploy();
    await DiplomaGuildC.deployTransaction.wait();
    console.log(`The diploma NFT was deployed at the address ${DiplomaGuildC.address}`);

    // SET DIPLOMA NFT ROLES WITH TIMELOCK ADDRESS
    await DiplomaGuildC.grantRole(await DiplomaGuildC.MINTER_ROLE(), timelockC.address);
    await DiplomaGuildC.grantRole(await DiplomaGuildC.PAUSER_ROLE(), timelockC.address);

    // 6. TOKEN DISTRIBUTION AND MARKING DELEGATION
    // -------
    // Mint some tokens for account 1
    await mintMarkingTokens(walletJoshua.address, markingC);
    // Mint some tokens for account 2
    await mintMarkingTokens(walletHardeep.address, markingC);
    
    // Check voting power of account 1 for the first time, before delegation
    await getVotingPower(walletJoshua.address, markingC);
    // Check voting power of account 2 for the first time, before delegation
    await getVotingPower(walletHardeep.address, markingC);

    // Self delegate for account 1 to create checkpoint and grant voting power (delegates everything we have)
    await delegate(signerJoshua, walletJoshua.address, markingC);
    // Self delegate for account 2 to create checkpoint and grant voting power (delegates everything we have)
    await delegate(signerHardeep, walletHardeep.address, markingC);
    console.log(`Delegation completed!`)

    // Check voting power for account 1 after delegation
    await getVotingPower(walletJoshua.address, markingC);
    // Check voting power for account 2 after delegation
    await getVotingPower(walletHardeep.address, markingC);

    // 7. PROPOSE
    // -------
    const studentAddress = account1.address;
    const projectURL = "https://github.com/w3ia/Encode-Solidity-Bootcamp---Team-4-Final-Project";
    let propId = await submitProject(DiplomaGuildC, govC, projectURL, studentAddress);

    // Get proposal end date
    let endDate = await getProposalEndDate(govC, propId);
    console.log(`Current time is: ${new Date().toLocaleString()}`)
    console.log(`Proposal estimated end date: ${endDate.toLocaleString()}`);

    // check the state
    let stateBeforeVote = await govC.state(propId);
    console.log(`proposal state before voting is: ${stateBeforeVote}`);

    // 8. VOTE
    // -------
    // account 1 votes
    // GovernorCountingSimple enum of VoteType is 0 against, 1 for, 2 abstain
    await vote(account1, propId, govC);
    // account 2 votes
    await vote(account2, propId, govC);
    
    // Fake the block creation - progess time
    console.log("Moving blocks forward...");
    await mine(2);
    let stateAfterMovingForward = await govC.state(propId);
    console.log(`proposal state after moving blocks forward: ${stateAfterMovingForward}`);

    // 9. QUEUE PROPOSAL
    // -------
    await queueProject(DiplomaGuildC, govC, projectURL, studentAddress);

    // CHECK IF USER HAS DIPLOMA NFT BEFORE EXECUTE - SHOULD RETURN 0
    let diplomaBalanceAccount = await DiplomaGuildC.balanceOf(studentAddress);
    console.log(`DiplomaGuild NFT balance before execution: ${ethers.utils.formatUnits(diplomaBalanceAccount, 0)}`);

    // 10. EXECUTE PROPOSAL
    await executeProject(DiplomaGuildC, govC, projectURL, studentAddress);

    // CHECK IF USER HAS DIPLOMA NFT AFTER EXECUTE - SHOULD RETURN 1
    diplomaBalanceAccount = await DiplomaGuildC.balanceOf(studentAddress);
    console.log(`DiplomaGuild NFT balance after execution: ${ethers.utils.formatUnits(diplomaBalanceAccount, 0)}`);
    console.log(`DiplomaGuild NFT TokenURI: ${await DiplomaGuildC.tokenURI(0)}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
