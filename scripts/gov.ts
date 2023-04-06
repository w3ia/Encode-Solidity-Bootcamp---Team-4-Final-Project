import { ethers } from "hardhat";
import { DiplomaGuildGov, DiplomaGuildGov__factory, MarkingToken, MarkingToken__factory } from "../typechain-types";
import { mine, time } from "@nomicfoundation/hardhat-network-helpers";
import { DiplomaGuildTimeLock__factory } from "../typechain-types/factories/contracts";
import { DiplomaGuildTimeLock } from "../typechain-types/contracts";

async function main() {
    // 1. GET TEST ACCOUNTS
    // -------
    const [deployer, account1, account2] = await ethers.getSigners();

    // 2. DEPLOY VOTING TOKEN
    // -------
    console.log("Deploying voting token contract!");
    const contractFactory = new MarkingToken__factory(deployer);
    const tokenContract: MarkingToken = await contractFactory.deploy();
    const deployTransactionReceipt = await tokenContract.deployTransaction.wait();
    console.log(`The Token contract was deployed at the address ${tokenContract.address}`);

    // 3. DEPLOY TIMELOCK 
    // -------
    console.log("Deploying voting token contract!");
    const contractFactoryTL = new DiplomaGuildTimeLock__factory(deployer);
    const timelockContract: DiplomaGuildTimeLock = await contractFactoryTL.deploy(0, [deployer.address], [deployer.address], deployer.address);
    const timelockContractReceipt = await timelockContract.deployTransaction.wait();
    console.log(`The Timelock contract was deployed at the address ${timelockContract.address}`);

    // DEPLOY GOVERNOR
    // -------
    console.log("Deploying governor contract!");
    const governorContractFactory = new DiplomaGuildGov__factory(deployer);
    console.log("Deploying contract ...");
    const governorContract: DiplomaGuildGov = await governorContractFactory.deploy(tokenContract.address, timelockContract.address);
    const deployTxReceipt = await governorContract.deployTransaction.wait();
    console.log(`The Governor contract was deployed at the address ${governorContract.address}`);

    // SET TIMELOCK ROLE WITH GOV ADDRESS
    const setExecutor = await timelockContract.grantRole(await timelockContract.EXECUTOR_ROLE(), governorContract.address)
    const setProposer = await timelockContract.grantRole(await timelockContract.PROPOSER_ROLE(), governorContract.address)

    // TOKEN DISTRIBUTION AND VOTING DELEGATION
    // -------
    const MINT_VALUE = ethers.utils.parseEther("99");
    // Mint some tokens for account 1
    const mintTx1 = await tokenContract.mint(account1.address, MINT_VALUE);
    const mintTxReceipt1 = await mintTx1.wait();
    console.log(`Tokens minted for ${account1.address} at block ${mintTxReceipt1.blockNumber}`);
    let tokenBalanceAccount1 = await tokenContract.balanceOf(account1.address);
    console.log(`Account 1 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount1)} Vote Tokens`);
    // Mint some tokens for account 2
    const mintTx2 = await tokenContract.mint(account2.address, MINT_VALUE);
    const mintTxReceipt2 = await mintTx2.wait();
    console.log(`Tokens minted for ${account2.address} at block ${mintTxReceipt2.blockNumber}`);
    let tokenBalanceAccount2 = await tokenContract.balanceOf(account2.address);
    console.log(`Account 2 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount2)} Vote Tokens`);
    // Check voting power of account 1 for the first time, before delegation
    let votePowerAccount1 = await tokenContract.getVotes(account1.address);
    console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);
    // Check voting power of account 2 for the first time, before delegation
    let votePowerAccount2 = await tokenContract.getVotes(account1.address);
    console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);
    // Self delegate for account 1 to create checkpoint and grant voting power (delegates everything we have)
    const delegateTx1 = await tokenContract.connect(account1).delegate(account1.address);
    const delegateTxReceipt1 = await delegateTx1.wait();
    console.log(`Tokens delegated from ${account1.address} for ${account1.address} at block ${delegateTxReceipt1.blockNumber}, cost of ${delegateTxReceipt1.gasUsed} gas units, totalling a transaction cost of ${delegateTxReceipt1.gasUsed.mul(delegateTxReceipt1.effectiveGasPrice)} Wei (${ethers.utils.formatEther(delegateTxReceipt1.gasUsed.mul(delegateTxReceipt1.effectiveGasPrice))} ETH)`);
    // Self delegate for account 2 to create checkpoint and grant voting power (delegates everything we have)
    const delegateTx2 = await tokenContract.connect(account2).delegate(account2.address);
    const delegateTxReceipt2 = await delegateTx2.wait();
    console.log(`Tokens delegated from ${account2.address} for ${account2.address} at block ${delegateTxReceipt2.blockNumber}, cost of ${delegateTxReceipt2.gasUsed} gas units, totalling a transaction cost of ${delegateTxReceipt2.gasUsed.mul(delegateTxReceipt2.effectiveGasPrice)} Wei (${ethers.utils.formatEther(delegateTxReceipt2.gasUsed.mul(delegateTxReceipt2.effectiveGasPrice))} ETH)`);
    // Check voting power for account 1 after delegation
    votePowerAccount1 = await tokenContract.getVotes(account1.address);
    console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);
    // Check voting power for account 2 after delegation
    votePowerAccount2 = await tokenContract.getVotes(account1.address);
    console.log(`Account 1 has a vote power of ${ethers.utils.formatEther(votePowerAccount1)} units`);

    // 5. PROPOSE
    // -------
    const tokenAddress = tokenContract.address;
    const teamAddress = account1.address;
    const grantAmount = ethers.utils.parseEther("3");
    const transferCalldata = tokenContract.interface.encodeFunctionData(`mint`, [teamAddress, grantAmount]);
    console.log(`token address is: ${tokenAddress}`);
    // set proposal
    let tx = await governorContract.propose(
        [tokenAddress],
        [0],
        [transferCalldata],
        `Proposal #1: Give grant to team`,
      );
    // console.log(tx);
    const receipt = await tx.wait();
    const receiptBlock = receipt.blockNumber;
    console.log(`Block when proposal is made: ${receiptBlock}`);
    const propId = receipt.events?.[0]?.args?.proposalId;
    console.log(`Proposal ID is: ${propId}`);
    // check the state
    const stateBeforeVote = await governorContract.state(propId);
    console.log(`proposal state before voting is: ${stateBeforeVote}`);

    // 6. VOTE
    // -------
    // account 1 votes
    const voteTx1 = await governorContract.connect(account1).castVote(propId, 1);  // GovernorCountingSimple enum of VoteType is 0 against, 1 for, 2 abstain
    const voteTxReceipt1 = await voteTx1.wait();
    // check the state
    const stateAfterVote1 = await governorContract.state(propId);
    console.log(`proposal state after vote 1 is: ${stateAfterVote1}`);
    console.log(`Block number after vote 1 is: ${voteTxReceipt1.blockNumber}`);
    const hasVoted1 = await governorContract.hasVoted(propId, account1.address)
    console.log(`Has vote for account1 after vote 1 is: ${hasVoted1}`);
    // account 2 votes
    const voteTx2 = await governorContract.connect(account2).castVote(propId, 1);
    const voteTxReceipt2 = await voteTx2.wait();
    // check the state
    const stateAfterVote2 = await governorContract.state(propId);
    console.log(`proposal state after vote 2 is: ${stateAfterVote2}`);
    console.log(`Block number after vote 2 is: ${voteTxReceipt2.blockNumber}`);
    const hasVoted2 = await governorContract.hasVoted(propId, account2.address)
    console.log(`Has vote for account2 after vote 2 is: ${hasVoted2}`);
    // check proposal votes after voting
    const propVotes = await governorContract.proposalVotes(propId)
    console.log(`Proposal votes are: ${propVotes}`);
    const forVotes = propVotes.forVotes;
    console.log(`For votes are: ${forVotes}`)
    const againstVotes = propVotes.againstVotes;
    console.log(`Against votes are: ${againstVotes}`)
    // check total supply of tokens.
    const totalSupplyToken = await tokenContract.totalSupply()
    console.log(`Token total supply is: ${totalSupplyToken}`)
    // check the quorum 
    const quorum = await governorContract.quorum(8);
    console.log(`Quorum is: ${quorum}`)
    // check the block again
    await mine(20);
    const block = await time.latestBlock();
    console.log(`Block number before calling queue function is: ${block}`);
    // checking the voting period
    const votingPeriod = await governorContract.votingPeriod()
    console.log(`Voting period is: ${votingPeriod}`)
    // // mine a new  block

    // QUEUE PROPOSAL
    // -------
    console.log(`deployer address is: ${deployer.address}`)
    const stateChange = await governorContract.state(propId);
    console.log(`Current state before queue is: ${stateChange}`)
    const descriptionHash = ethers.utils.id(`Proposal #1: Give grant to team`);
    const queueTx = await governorContract.queue(
      [tokenAddress],
      [0],
      [transferCalldata],
      descriptionHash,
      {gasLimit: 1000000}
    );
    const queueTxReceipt = await queueTx.wait();
    console.log(`Proposal queued at block: ${queueTxReceipt.blockNumber}`);

    // EXECUTE PROPOSAL
    const executeTx = await governorContract.execute(
        [tokenAddress],
        [0],
        [transferCalldata],
        descriptionHash,
      );
    const executeTxReceipt = await queueTx.wait();
    console.log(`Proposal executed at block: ${executeTxReceipt.blockNumber}`);

    tokenBalanceAccount1 = await tokenContract.balanceOf(account1.address);
    console.log(tokenBalanceAccount1)


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
