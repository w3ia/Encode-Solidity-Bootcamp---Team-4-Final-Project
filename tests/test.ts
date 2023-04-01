import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  DiplomaNFT,
  DiplomaNFT__factory,
  Governor__factory,
  MarkingToken,
  MarkingToken__factory,
  MyGovernor,
  MyGovernor__factory,
} from '../typechain-types';

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe('contract', function () {
  let markingTokenContract: MarkingToken;
  let diplomaNFTContract: DiplomaNFT;
  let governorContract: MyGovernor;
  let deployer: SignerWithAddress;
  let student1: SignerWithAddress;
  let student2: SignerWithAddress;
  let student3: SignerWithAddress;

  beforeEach(async function () {
    // setup accounts
    const [deployer, student1, student2, student3] = await ethers.getSigners();

    // Deploy Contracts
    const markingTokenCF = new MarkingToken__factory(deployer);
    markingTokenContract = await markingTokenCF.deploy();
    const markingTokenCTx = await markingTokenContract.deployTransaction.wait();
    console.log(`
    Marking Token contract deployed:
    address: ${markingTokenCTx.contractAddress}
    block: ${markingTokenCTx.blockNumber}`);

    const diplomaNFTCF = new DiplomaNFT__factory(deployer);
    diplomaNFTContract = await diplomaNFTCF.deploy();
    const diplomaNFTCTx = await diplomaNFTContract.deployTransaction.wait();
    console.log(`
    Diploma NFT contract deployed:
    address: ${diplomaNFTCTx.contractAddress}
    block: ${diplomaNFTCTx.blockNumber}`);

    const governorCF = new MyGovernor__factory(deployer);
    governorContract = await governorCF.deploy(diplomaNFTContract.address, 1);
    const governorCTx = await governorContract.deployTransaction.wait();
    console.log(`
    Governor contract deployed:
    address: ${governorCTx.contractAddress}
    block: ${governorCTx.blockNumber}`);
  });

  describe.skip('when a student is connected to Diploma DAO', function () {
    it('has the marking token balance', async function () {
      // code here
    });
  });

  describe.skip('when the student requests tokens', function () {
    it('increases the marking token balance', async function () {
      // code here
    });
  });

  describe.skip('when the student submits a project', function () {
    it('stores/displays project ID, URL/IPFS, and project status ', async function () {
      // code here
    });

    it('fails if no URL/IPFS Hash is entered', async function () {
      // code here
    });

    it('fails if marking token balance is zero', async function () {
      // code here
    });

    it('will allow student to mint a Diploma NFT if their project status has received required number of passes', async function () {
      // code here
    });
  });

  describe.skip('when a student views the Cohort section', async function () {
    it('should list all available projects sorted by ???', async function () {
      // code here
    });

    it('should list only open projects when toggle/switch is set to OPEN', async function () {
      // code here
    });
    it('should list only closed projects when toggle/switch is set to CLOSED', async function () {
      // code here
    });

    it('should register a passing vote if a student enters a project ID in the form field and triggers vote transaction', async function () {
      // code here
    });
  });
});
