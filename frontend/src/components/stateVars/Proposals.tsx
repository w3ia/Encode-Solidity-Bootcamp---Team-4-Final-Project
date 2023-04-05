import { ethers } from 'ethers';
import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useContractReads, useContractRead } from 'wagmi'
import { GOV_CONTRACT_ADDRESS, GOV_ABI } from "../../constants/contracts";

export const Proposals = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useContractRead({
        address: GOV_CONTRACT_ADDRESS,
        abi: GOV_ABI,
        functionName: 'proposals',
      })
      
    if (isConnected && data) {
        console.log('data')
        console.log(data)
        return (
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Proposal</h2>
                </div>
            </div>
      );
    }
    return <div>Not Connected</div>
}

