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

interface Props {
    projectId?: string;
}

export default function MyProjectStatus({ projectId }: Props) {
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
        console.log(`state of project: ${projectId}`);
        console.log(state);
        setProjectState(state);
      }
    }
    getState();
  }, [govC, projectId]);

  return <div>Project Status: {projectState}</div>;
}