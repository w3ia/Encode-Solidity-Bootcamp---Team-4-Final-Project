    const votingPeriod = await governorContract.votingPeriod()
    console.log(`Voting period is: ${votingPeriod}`)


import { useAccount, useSigner, useContract, useBlockNumber, useContractRead } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_ABI, LOTTERY_CONTRACT_ADDRESS } from '../constants/contracts';
import { BigNumber, ethers } from 'ethers';

export const BetTimer = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useBlockNumber();
    /*const { data, isError, isLoading } = useContractRead({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: LOTTERY_ABI,
        functionName: 'betsClosingTime',
      })*/

    async function getBlockTimes() {
        console.log("inside");
        const provider = ethers.getDefaultProvider('sepolia');
        if(data) {
            //console.log(data.toString());
            const block = await provider.getBlock(data);
            console.log(`timestamp: ${block.timestamp}`);
            console.log(`timestamp ethers: ${ethers.utils.parseUnits(block.timestamp.toString())}`);
            console.log(`timestamp bignumber: ${BigNumber.from(block.timestamp.toString())}`);

        }
    }

    if (isConnected) {
        getBlockTimes();
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography component={'span'} variant={'body1'} align={'center'}>
                    PLACEHOLDER - TIMER HERE
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}