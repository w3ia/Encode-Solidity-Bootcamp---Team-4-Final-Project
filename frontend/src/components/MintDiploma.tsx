import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useContract,
  usePrepareContractWrite,
  useContractWrite,
  useContractReads,
  useContractRead,
  useSigner,
} from "wagmi";
import { GOV_CONTRACT_ADDRESS, GOV_ABI } from "../constants/contracts";
import axios from "axios";

interface Props {
  projectState?: any;
  projectUrl?: string;
  studentAddress?: string;
}

const PROJECT_STATES = [
  "Pending",
  "Active",
  "Canceled",
  "Defeated",
  "Succeeded",
  "Queued",
  "Expired",
  "Executed",
];

const API_BASE_URL = "http://localhost:3001/";

export default function MintDiploma({
  projectState,
  projectUrl,
  studentAddress,
}: Props) {
  const [projectStatus, setProjectStatus] = useState("");
  const { data: signer, isError, isLoading } = useSigner();
  const { address, isConnected, isDisconnected } = useAccount();

  const govC = useContract({
    address: GOV_CONTRACT_ADDRESS,
    abi: GOV_ABI,
    signerOrProvider: signer,
  });

  const mintHandler = async () => {
    alert("Mint request has been submitted.");
    async function getState() {
      if (govC) {
        try {
          const response = await axios.post(
            `${API_BASE_URL}queue-and-execute`,
            {
              projectURL: projectUrl,
              studentAddress: studentAddress,
            }
          );
          alert(
            "Almost there! Please wait a few minutes, then check your wallet for the DiplomaGuild NFT."
          );
          console.log(response);
        } catch (error) {
          console.log("Transaction Error: ");
          console.log(error);
        }
      }
    }
    getState();
  };
  if (projectState) {
    if (PROJECT_STATES[projectState] === "Succeeded") {
      return (
        <button onClick={mintHandler} className="btn btn-outline btn-secondary">
          Mint Diploma
        </button>
      );
    }
    if (PROJECT_STATES[projectState] === "Queued") {
      return (
        <div>
          Diploma is being minted. Check your wallet address in a few minutes.
        </div>
      );
    }
    if (PROJECT_STATES[projectState] === "Executed") {
      return <div>DiplomaGuild NFT Minted.</div>;
    }
  }

  return <div>Project has not met requirements for an NFT Diploma.</div>;
}
