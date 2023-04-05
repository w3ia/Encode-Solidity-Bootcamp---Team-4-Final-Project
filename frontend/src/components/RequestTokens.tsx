import React from 'react';
import { ethers, Signer } from 'ethers';
import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi';
import { FT_CONTRACT_ADDRESS, FT_ABI } from "../constants/contracts";

export const RequestTokens = () => {
    const [amount, setAmount] = React.useState("0")
    const [addr, setAddr] = React.useState("")
    const { address, isConnected, isDisconnected } = useAccount()
    const { data: signer, isError } = useSigner()
    const formatEtherAmount = parseInt(amount) > 0 ? ethers.utils.parseEther(amount) : ethers.utils.parseEther("0");

    const ftC = useContract({
        address: FT_CONTRACT_ADDRESS,
        abi: FT_ABI,
        signerOrProvider: signer,
    });

    async function submitHandler() {
        if(ftC) {
            const requestTokensTx = await ftC.mint(addr, formatEtherAmount)
            const receiptTx = await requestTokensTx.wait()
            console.log(`Tokens minted at block: ${receiptTx.blockNumber}`)
        }
    }
    if (isConnected) {
        return (
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Request Voting Tokens Here</h2>
                    <p>Input the amount of tokens you want to request.</p>
                    <div className="card-actions justify-end">
                    <input type="text" placeholder="Type here" className="input input-primary input-lg w-full max-w-xs bg-primary" onChange={(e) => setAmount(e.target.value)} value={amount}/>
                    <input type="text" placeholder="Type here" className="input input-primary input-lg w-full max-w-xs bg-primary" onChange={(e) => setAddr(e.target.value)} value={addr}/>
                    <button className="btn btn-primary" onClick={submitHandler}>Mint Now</button>
                    </div>
                </div>
            </div>
      );
    }
    return <div>Not Connected</div>
}