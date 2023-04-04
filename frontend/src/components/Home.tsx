import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import LoginComponent from "../components/LoginComponent";
import MainPage from "../components/MainPage";
import MyProject from "../components/MyProject";
import Cohort from "../components/Cohort";
import AppContext from "../components/store/AppContext";
import { useAccount } from "wagmi";

export default function Home() {
  const AppCtx = useContext(AppContext);
  const { isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return null;

  if (!isConnected) {
    return <LoginComponent />;
  }

  console.log(AppCtx.activeLink);

  return (
    <div>
      <main className={styles.main}>
        {AppCtx.activeLink === "Main" && <MainPage />}
        {AppCtx.activeLink === "MyProject" && <MyProject />}
        {AppCtx.activeLink === "Cohort" && <Cohort />}
      </main>
    </div>
  );
}
