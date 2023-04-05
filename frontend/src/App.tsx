import "../src/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import MainLayout from "../src/components/MainLayout";
import AppProvider from "../src/components/store/AppProvider";
import {VotingPeriod} from "../src/components/stateVars/VotingPeriod"
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
            <VotingPeriod/>
          </MainLayout>
        </AppProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;

