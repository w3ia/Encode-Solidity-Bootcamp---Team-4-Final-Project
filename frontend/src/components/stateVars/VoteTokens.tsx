import { ethers } from "ethers";
import { FT_CONTRACT_ADDRESS, FT_ABI } from "../../constants/contracts";
import { useAccount, useContract, useSigner } from "wagmi";
import { useContext, useEffect } from "react";
import AppContext from "../../components/store/AppContext";

export const VoteTokens = () => {
    const AppCtx = useContext(AppContext);

  const { address, isConnected, isDisconnected } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();

  const tokenC = useContract({
    address: FT_CONTRACT_ADDRESS,
    abi: FT_ABI,
    signerOrProvider: signer,
  });

  const getVotePower = async () => {
    if (tokenC) {
      let votePower = ethers.utils.formatEther(await tokenC.getVotes(address));
      console.log("votePower");
      console.log(votePower);
      AppCtx.setVotePower(votePower)
    }
  };

  useEffect(() => {
    getVotePower();
  }, [])

  if (isConnected) {
    return (<div>Voting Power: {AppCtx.votePower}</div>);
  }
  return <div>Not Connected</div>;
};
