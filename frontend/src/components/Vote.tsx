import React from 'react';
import { ethers, Signer } from 'ethers';
import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi';
import { FT_CONTRACT_ADDRESS, FT_ABI, GOV_CONTRACT_ADDRESS, GOV_ABI } from "../constants/contracts";

export const Vote = () => {
    const [vote, setVote] = React.useState("0")
    const [project, setProject] = React.useState("")
    const { address, isConnected, isDisconnected } = useAccount()
    const { data: signer, isError } = useSigner()
    const formatVote = parseInt(vote)
    // const formatEtherAmount = parseInt(amount) > 0 ? ethers.utils.parseEther(amount) : ethers.utils.parseEther("0");

    const govC = useContract({
        address: GOV_CONTRACT_ADDRESS,
        abi: GOV_ABI,
        signerOrProvider: signer,
    });

    async function submitHandler() {
        if(govC) {
            const voteTx = await govC.castVote(project, formatVote)
            const receiptTx = await voteTx.wait()
            console.log(`Tokens minted at block: ${receiptTx.blockNumber}`)
        }
    }
    if (isConnected) {
        return (
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Vote Here</h2>
                    <p>Input the proposal ID you want to vote for and if you abstain (0), are for it (1), or against (2).</p>
                    <div className="card-actions justify-center">
                    <input type="text" placeholder="Token Amount" className="input input-primary input-lg w-full max-w-xs bg-primary" onChange={(e) => setProject(e.target.value)} value={project}/>
                    <input type="text" placeholder="Address" className="input input-primary input-lg w-full max-w-xs bg-primary" onChange={(e) => setVote(e.target.value)} value={vote}/>
                    <button className="btn btn-primary" onClick={submitHandler}>Vote Now</button>
                    </div>
                </div>
            </div>
      );
    }
    return <div>Not Connected</div>
}