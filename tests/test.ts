import { expect } from 'chai';
import { ethers } from 'hardhat';

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe('contract', function () {
  let contractNameContract: ContractName;

  beforeEach(async function () {
    // setup contract factories
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
