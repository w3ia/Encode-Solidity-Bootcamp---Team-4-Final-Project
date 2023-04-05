import {
  DiplomaGuildGov,
  DiplomaGuildGov__factory,
  DiplomaGuildTimeLock,
  DiplomaGuildTimeLock__factory,
  MarkingToken,
  MarkingToken__factory,
  DiplomaGuildNFT,
  DiplomaGuildNFT__factory,
  DiplomaGuildProps,
  DiplomaGuildProps__factory,
} from "../../../typechain-types";
import { BigNumberish, ethers } from "ethers";
import React, { useState } from "react";
import style from "../styles/MyProjectInput.module.css";
import {
  useAccount,
  useContract,
  usePrepareContractWrite,
  useContractWrite,
  useContractReads,
  useContractRead,
  useSigner,
} from "wagmi";
import {
  GOV_CONTRACT_ADDRESS,
  GOV_ABI,
  PRO_CONTRACT_ADDRESS,
  PRO_ABI,
} from "../constants/contracts";
import { PromiseOrValue } from "../../../typechain-types/common";

const diplomaURI =
  "ipfs://bafkreihqfo2yd4o7fjveg5bptjgaobwqdd7nk7i7l7a6xmm5s25lrzabjm";

// Submit project (proposal)
async function submitProject(
  DiplomaGuildC: DiplomaGuildNFT,
  govC: DiplomaGuildGov,
  projectURL: string,
  studentAddress: string
) {
  let transferCalldata = DiplomaGuildC.interface.encodeFunctionData(
    `safeMint`,
    [studentAddress, diplomaURI]
  );

  let proposeTx = await govC.propose(
    [DiplomaGuildC.address],
    [0],
    [transferCalldata],
    projectURL
  );

  let receipt = await proposeTx.wait();
  let propId = receipt.events?.[0]?.args?.proposalId;
  let proposer = receipt.events?.[0]?.args?.proposer;
  let description = receipt.events?.[0]?.args?.description;

  let dataObject = {
    propId: propId,
    proposer: proposer,
    description: description,
  };
  console.log(dataObject);
  return dataObject;
}

async function storeProposal(
  data: {
    propId: BigNumberish;
    proposer: string;
    description: string;
  },
  proposal: DiplomaGuildProps
) {
  let propTx = await proposal.addProposal(
    data.propId,
    data.proposer,
    data.description
  );
  let propTxReceipt = await propTx.wait();
  console.log("propTxReceipt:");
  console.log(propTxReceipt);
}

export default function MyProjectInput() {
  let govC: DiplomaGuildGov;
  let DiplomaGuildC: DiplomaGuildNFT;
  let proposalC: DiplomaGuildProps;
  //   const [projectData, setProjectData] = useState([]);
  const [formInput, setFormInput] = useState("");
  const { address, isConnected, isDisconnected } = useAccount();

  //   const {
  //     data: proData,
  //     isError: isProError,
  //     isLoading: isProLoading,
  //   } = useContractRead({
  //     address: PRO_CONTRACT_ADDRESS,
  //     abi: PRO_ABI,
  //     functionName: "getAllProposals",
  //   });

  //   setProjectData(proData);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // submit proposal
    // if (address) {
    //   let proposalData = await submitProject(
    //     DiplomaGuildC,
    //     govC,
    //     formInput,
    //     address
    //   );

    //   await storeProposal(proposalData, proposalC);
    // }

    console.log(DiplomaGuildC,
      govC,
      formInput,
      address)


    // submit proposal;
    alert(`Submitting Proposal with IPFS url: ${formInput}`);
    setFormInput("");
  };

  return (
    <form className={style.project} onSubmit={submitHandler}>
      <div className="form-control w-full mt-10">
        <label className="label">
          <span className="label-text">Submit Your Project</span>
        </label>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter IPFS URL . . ."
            className="input input-bordered w-full inline"
            value={formInput}
            onChange={(event) => setFormInput(event.target.value)}
            required
          />
          {isConnected && (
            <button className="btn btn-outline btn-primary inline ml-2 px-8">
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
