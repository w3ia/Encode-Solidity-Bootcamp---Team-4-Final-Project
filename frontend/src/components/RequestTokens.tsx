import React from 'react';
import { ethers } from 'ethers';
import { useAccount, useContract, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { FT_CONTRACT_ADDRESS, FT_ABI } from "../constants/contracts";

export const RequestTokens = () => {
    const [amount, setAmount] = React.useState("0")
    const { address, isConnected, isDisconnected } = useAccount()
    const formatEtherAmount = parseInt(amount) > 0 ? ethers.utils.parseEther(amount) : ethers.utils.parseEther("0");
    const { config } = usePrepareContractWrite({
        address: FT_CONTRACT_ADDRESS,
        abi: FT_ABI,
        functionName: 'mint',
        args: [{value: formatEtherAmount}],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
      
    const purchaseHandler = () => {
        if (parseInt(amount) > 0) write?.();
        else alert('Please enter an amount greater than 0')
    }
    if (isConnected) {
        return (
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Request Voting Tokens Here</h2>
                    <p>Input the amount of tokens you want to request.</p>
                    <div className="card-actions justify-end">
                    <input type="text" placeholder="Type here" className="input w-full max-w-xs" onChange={(e) => setAmount(e.target.value)} value={amount}/>
                    <button className="btn btn-primary" onClick={purchaseHandler}>Buy Now</button>
                    {isLoading && <div>Check Wallet</div>}
                    {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                    </div>
                </div>
            </div>
            // <Card sx={{ minWidth: 275, minHeight: 100 }}>
            //     <CardContent>
            //         <Typography component={'span'} variant={'body1'} align={'center'}>
            //             <div>
            //             <TextField
            //                     id="amount"
            //                     type="number"
            //                     size="small"
            //                     InputProps={{ inputProps: { min: 1 } }}
            //                     onChange={(e) => setAmount(e.target.value)}
            //                     placeholder="enter token amount"
            //                     value={amount}
            //                 />
            //                 <Button variant="contained" disabled={!write} onClick={purchaseHandler}>
            //                     Purchase Tokens
            //                 </Button>
            //                 {isLoading && <div>Check Wallet</div>}
            //                 {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            //             </div>
            //         </Typography>
            //     </CardContent>
            // </Card>
      );
    }
    return <div>Not Connected</div>
}