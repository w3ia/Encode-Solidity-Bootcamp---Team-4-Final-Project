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
import MintDiploma from "./MintDiploma";

interface Props {
  projectId?: string;
  projectUrl?: string;
  studentAddress?: string;
  mode?: boolean;
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

export default function MyProjectStatus({
  projectId,
  projectUrl,
  studentAddress,
  mode,
}: Props) {
  const [projectState, setProjectState] = useState("");
  const { data: signer, isError, isLoading } = useSigner();
  const { address, isConnected, isDisconnected } = useAccount();


  const govC = useContract({
    address: GOV_CONTRACT_ADDRESS,
    abi: GOV_ABI,
    signerOrProvider: signer,
  });

  useEffect(() => {
    async function getState() {
      if (govC) {
        let state = await govC.state(projectId);
        setProjectState(state);
      }
    }
    getState();
  }, [govC, projectId]);

  return (
    <>
      <div>Status: {PROJECT_STATES[Number(projectState)]}</div>
      {mode && <div>
        <MintDiploma
          projectState={projectState}
          projectUrl={projectUrl}
          studentAddress={studentAddress}
        />
      </div>}
    </>
  );
}
