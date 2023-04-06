import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, Signer } from 'ethers';
import * as govJson from './assets/DiplomaGuildGov.json';
import * as diplomaJson from './assets/DiplomaGuildNFT.json';

const GOVERNOR_ADDRESS = "0xE32B360509E8b673aD766CB96bFcA990b03E1c22"; 
const DIPLOMAGUILD_ADDRESS = "0xa4a229194FfB476803543f5f31df870ADb424E3F"; 
const DIPLOMA_URI = "ipfs://bafkreihqfo2yd4o7fjveg5bptjgaobwqdd7nk7i7l7a6xmm5s25lrzabjm";
@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  govC: ethers.Contract;
  diplomaGuildC: ethers.Contract;
  constructor(private config: ConfigService) {
    //this.provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    this.provider = ethers.getDefaultProvider('sepolia');
    this.govC = new ethers.Contract(GOVERNOR_ADDRESS, govJson.abi, this.provider);
    this.diplomaGuildC = new ethers.Contract(DIPLOMAGUILD_ADDRESS, diplomaJson.abi, this.provider);
  }

  async queueAndExecute(projectURL: string, studentAddress: string): Promise<string> {
    // Setup signer:
    //const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const privKey = this.config.get<string>('PRIVATE_KEY');
    if(!privKey || privKey.length <= 0) throw new HttpException('Internal Server Error: Invalid Key', HttpStatus.INTERNAL_SERVER_ERROR);

    let deployer: ethers.Wallet;
    try {
      const deployerWallet = new ethers.Wallet(privKey);
      deployer = deployerWallet.connect(this.provider);
      console.log(`deployer connected with: ${deployer.address}`);
    } catch(e) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized: Invalid Signer',
      }, HttpStatus.UNAUTHORIZED, {
        cause: e
      });
    }
    let descriptionHash = ethers.utils.id(projectURL);
    let transferCalldata = this.diplomaGuildC.connect(deployer).interface.encodeFunctionData(`safeMint`, [studentAddress, DIPLOMA_URI]);

    // Queue project
    try {
      const queueTx = await this.govC.connect(deployer).queue(
        [DIPLOMAGUILD_ADDRESS],
        [0],
        [transferCalldata],
        descriptionHash,
      );
      let queueTxReceipt = await queueTx.wait();
      console.log(`Project queued with TX ${queueTxReceipt.transactionHash}`);
    } catch(e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Project queing failed - Check server log for further details',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e
      });
    }

    // Execute project
    try{
      let executeTx = await this.govC.connect(deployer).execute(
        [DIPLOMAGUILD_ADDRESS],
        [0],
        [transferCalldata],
        descriptionHash,
      );
      let executeTxReceipt = await executeTx.wait();
      let executeHash = await executeTxReceipt.transactionHash;
      console.log(`Project executed with TX: ${executeHash}`);
      return executeHash;
    } catch(e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Project execution failed - Check server log for further details',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e
      });
    }
  }
}