import { ethers } from "hardhat";
import { MyGovernor, MyGovernor__factory, MarkingToken, MarkingToken__factory } from "../typechain-types";
import { token } from "../typechain-types/@openzeppelin/contracts";

async function main() {
    // 1. GET TEST ACCOUNTS
    const [deployer, account1, account2] = await ethers.getSigners();

    // 2. DEPLOY VOTING TOKEN
    console.log("Deploying voting token contract!");
    const contractFactory = new MarkingToken__factory(deployer);
    const tokenContract: MarkingToken = await contractFactory.deploy();
    const deployTransactionReceipt = await tokenContract.deployTransaction.wait();
    console.log(`The Token contract was deployed at the address ${tokenContract.address}`);

    // 3. DEPLOY GOVERNOR
    console.log("Deploying governor contract!");
    const governorContractFactory = new MyGovernor__factory(deployer);
    console.log("Deploying contract ...");
    const governorContract: MyGovernor = await governorContractFactory.deploy(tokenContract.address, deployer.address);
    const deployTxReceipt = await governorContract.deployTransaction.wait();
    console.log(`The Governor contract was deployed at the address ${governorContract.address}`);

    // 4. TOKEN DISTRIBUTION AND VOTING DELEGATION
    const MINT_VALUE = ethers.utils.parseEther("10");
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
    const tokenAddress = tokenContract.address;
    const teamAddress = account1.address;
    const grantAmount = ethers.utils.parseEther("1");
    const transferCalldata = tokenContract.interface.encodeFunctionData(`transfer`, [teamAddress, grantAmount]);
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
    console.log(receipt);
    // check the state
    const stateBeforeVote = await governorContract.state("85145047626562844815729868439955896131593233859946815759482103696516021498157");
    console.log(`proposal state before vote is: ${stateBeforeVote}`);

    // 5. VOTE
    const voteTx = await governorContract.connect(account1).castVote("85145047626562844815729868439955896131593233859946815759482103696516021498157", 1)
    const voteTxReceipt = await voteTx.wait();
    console.log(voteTxReceipt);
    // check the state
    const stateAfterVote = await governorContract.state("85145047626562844815729868439955896131593233859946815759482103696516021498157");
    console.log(`proposal state before vote is: ${stateAfterVote}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});