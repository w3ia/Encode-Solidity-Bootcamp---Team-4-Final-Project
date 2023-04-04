import { ethers } from 'ethers';
import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useContractReads, useContractRead } from 'wagmi'
import { GOV_CONTRACT_ADDRESS, GOV_ABI } from "../../constants/contracts";

export const VotingPeriod = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useContractRead({
        address: GOV_CONTRACT_ADDRESS,
        abi: GOV_ABI,
        functionName: 'votingPeriod',
      })
      
    if (isConnected && data) {
        return (
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Voting Period</h2>
                    <p>{!isError && <div>Voting period is: <strong>{data.toString()} Blocks</strong></div>}</p>
                </div>
            </div>
      );
    }
    return <div>Not Connected</div>
}

