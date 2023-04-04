// import {
//   Connect,
//   UserBalanceDisplay,
//   BuyTokens,
//   Bet,
//   OpenBets,
//   CloseLottery,
//   ReturnTokens,
//   PrizeWithdraw,
//   OwnerWithdraw
// } from './components/ExportComponents';
// import {
//   BetState,
//   PaymentToken,
//   PurchaseRatio,
//   BetPrice,
//   BetFee,
//   PrizePool,
//   OwnerPool,
//   BetsClosingTime
// } from './components/stateVarReads/ExportStateVarReads';
// import FadeCard from './components/FadeCard';
// import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { configureChains, createClient, WagmiConfig, useAccount } from 'wagmi';
// import { sepolia } from 'wagmi/chains';
// import { infuraProvider } from 'wagmi/providers/infura';
// import Container from '@mui/material/Container';
// import { Grid } from '@mui/material';
// import '@rainbow-me/rainbowkit/styles.css';
// import './App.css';


import "../src/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import MainLayout from "../src/components/MainLayout";
import AppProvider from "../src/components/store/AppProvider";
import Home from "./components/Home";


const { chains, provider } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY as string })]
);

const { connectors } = getDefaultWallets({
  appName: "Diploma Guild",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { WagmiConfig, RainbowKitProvider };


const App = () => {
  const deployer = '';
  const { address, isConnected } = useAccount();
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <AppProvider>
          <MainLayout>
            <Home/>
          </MainLayout>
        </AppProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
