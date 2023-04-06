import { useContext, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/Navbar.module.css";
import AppContext from "../components/store/AppContext";
import { useAccount } from "wagmi";

export default function Navbar() {
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
    <div className="navbar bg-base-100 flex justify-between">
      <div>
        <a className="btn btn-ghost normal-case text-xl">Diploma Guild</a>
      </div>
      {isConnected && (
        <div className={styles.navBarLinks}>
          <ul className="menu menu-horizontal px-1">
            <li>
              <a onClick={() => AppCtx.setActiveLink("Main")}>Main</a>
            </li>
            <li>
              <a onClick={() => AppCtx.setActiveLink("MyProject")}>
                My Project
              </a>
            </li>
            <li>
              <a onClick={() => AppCtx.setActiveLink("Cohort")}>Cohort</a>
            </li>
          </ul>
        </div>
      )}
        <ConnectButton />
    </div>
  );
}
