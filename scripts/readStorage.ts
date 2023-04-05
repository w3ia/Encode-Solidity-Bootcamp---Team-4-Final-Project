import { ethers } from "hardhat";
import { DiplomaGuildGov, DiplomaGuildGov__factory } from "../typechain-types";

const DIPLOMA_GOV_ADDRESS = "0xEd10ebDE8833cC088b6565504C7E1Bb019947560";

// CONNECT SEPOLIA
const provider = new ethers.providers.EtherscanProvider(
  "sepolia",
  "XCN34W2YDBH64KUSC86FVF6X2XIGYKG2UY"
);

async function main() {
  // const pk = process.env.PRIVATE_KEY;
  // if(!pk || pk.length <= 0) throw new Error("Missing environment: private key");
  // const wallet = new ethers.Wallet(pk);
  // console.log(`Connected to wallet address: ${wallet.address}`);
  // const signer = wallet.connect(provider);

  // const DiplomaGuildGovF = new DiplomaGuildGov__factory(signer);

  const data = await ethers.provider.getStorageAt(DIPLOMA_GOV_ADDRESS, 4);
  const formattedData = await ethers.utils.parseBytes32String(data);
  console.log("formattedData: ");
  console.log(formattedData);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
