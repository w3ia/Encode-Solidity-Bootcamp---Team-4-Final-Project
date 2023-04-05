import styles from "../styles/MainPage.module.css";
import { RequestTokens } from "./RequestTokens";
import { useContext, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AppContext from "../components/store/AppContext";
import { useAccount } from "wagmi";
import { Vote } from "./Vote";


export default function MainPage() {
  const AppCtx = useContext(AppContext);
  const { isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>
          <span>Main Page</span>
        </h1>
      </header>
      <div className={styles.buttons_container}>
        <div>
          <RequestTokens />
        </div>
        <div className={styles.button}>
          <a onClick={() => AppCtx.setActiveLink("MyProject")}>My Project</a>
        </div>
        <div className={styles.button}>
          <a onClick={() => AppCtx.setActiveLink("Cohort")}>Cohort</a>
        </div>
        <div>
          <Vote />
        </div>
      </div>
    </div>
  );
}
