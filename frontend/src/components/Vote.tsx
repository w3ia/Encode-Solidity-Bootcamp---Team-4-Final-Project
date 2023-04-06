import React from "react";
import { ethers, Signer } from "ethers";
import {
  useAccount,
  useContract,
  usePrepareContractWrite,
  useContractWrite,
  useSigner,
} from "wagmi";
import {
  GOV_CONTRACT_ADDRESS,
  GOV_ABI,
} from "../constants/contracts";
import { VoteTokens } from "./stateVars/VoteTokens";

export const Vote = () => {
  const [vote, setVote] = React.useState("");
  const [project, setProject] = React.useState("");
  const { address, isConnected, isDisconnected } = useAccount();
  const { data: signer, isError } = useSigner();
  const formatVote = parseInt(vote);

  const govC = useContract({
    address: GOV_CONTRACT_ADDRESS,
    abi: GOV_ABI,
    signerOrProvider: signer,
  });

  async function submitHandler() {
    if (govC) {
      const voteTx = await govC.castVote(project, formatVote);
      const receiptTx = await voteTx.wait();
      console.log(`Voting succeeded at block: ${receiptTx.blockNumber}`);
    }
  }
  if (isConnected) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Review Here</h2>
          {/* Display Voting Power */}
          <VoteTokens />
          <p>Input the Project ID you want to review. Enter a number: </p>

          <div>(0) - Abstain,</div>
          <div>(1) - Pass,</div>
          <div>(2) - Not Pass.</div>

          <div className="card-actions justify-center">
            <input
              type="text"
              placeholder="Project ID"
              className="input input-primary input-lg w-full max-w-xs bg-primary"
              onChange={(e) => setProject(e.target.value)}
              value={project}
            />
            <input
              type="text"
              placeholder="Enter number"
              className="input input-primary input-lg w-full max-w-xs bg-primary"
              onChange={(e) => setVote(e.target.value)}
              value={vote}
            />
            <button className="btn btn-primary" onClick={submitHandler}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <div>Not Connected</div>;
};
