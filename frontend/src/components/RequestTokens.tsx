import React from 'react';
import { ethers } from 'ethers';
import { useAccount, useContract, useSigner } from 'wagmi'
import { GOV_CONTRACT_ADDRESS, GOV_ABI, FT_CONTRACT_ADDRESS, FT_ABI } from "../constants/contracts";

export const ReturnTokens = () => {
    const [tokens, setTokens] = React.useState('');

    const { isConnected } = useAccount();
    const { data: signer, isError, isLoading } = useSigner()

    const ftC = useContract({
        address: FT_CONTRACT_ADDRESS,
        abi: FT_ABI,
        signerOrProvider: signer,
    });

    async function handleSubmit() {
        if(lotteryC && tokenC) {
            const allowTx = await tokenC.approve(LOTTERY_CONTRACT_ADDRESS, ethers.utils.parseEther(tokens));
            const receiptAllow = await allowTx.wait();
            console.log(`Allowance confirmed (${receiptAllow.transactionHash})\n`);
            const tx = await lotteryC.returnTokens(ethers.utils.parseEther(tokens));
            const receipt = await tx.wait();
            console.log(`Burn confirmed (${receipt.transactionHash})\n`);
        }
    }
    if (isConnected) {
         return (
                <Card sx={{ minWidth: 275, minHeight: 90 }}>
                    <CardContent>
                        <Typography component={'span'} variant={'body1'} align={'center'}>
                            <div>
                                <TextField
                                    value={tokens}
                                    onChange={e => setTokens(e.target.value)}
                                    placeholder="enter token amount"
                                    InputProps={{ inputProps: { min: 1 } }}
                                    type="number"
                                    size="small" 
                                    />
                                <Button variant="contained" onClick={handleSubmit}>
                                    refund ETH
                                </Button>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>
        )
    }
    return <div>Not Connected</div>
}