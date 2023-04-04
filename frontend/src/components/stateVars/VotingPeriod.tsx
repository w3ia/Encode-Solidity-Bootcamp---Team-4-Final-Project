import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useContractReads, useContractRead } from 'wagmi'
import { GOV_CONTRACT_ADDRESS, GOV_ABI } from "../../constants/contracts";

export const BetFee = () => {
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
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
      );
    }
    return <div>Not Connected</div>
}