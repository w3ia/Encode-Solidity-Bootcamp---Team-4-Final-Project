import { SetStateAction, useState } from "react";
import styles from "../styles/MyProject.module.css";
import LoadingAlert from "./LoadingAlert";
import MyProjectInput from "./MyProjectInput";
import MyProjectTable from "./MyProjectTable";
export default function MyProject() {
  const [isTxLoading, setIsTxLoading] = useState("");

  const loadingHandler = (action: SetStateAction<string>) => {
    setIsTxLoading(action);
  };
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>
          <span>My Project</span>
        </h1>
        {isTxLoading && (
          <div className="mt-10">
            <LoadingAlert message={isTxLoading}/>
          </div>
        )}
      </header>
      <div className={styles.projectTable}>
        <MyProjectTable />
      </div>
      <MyProjectInput waitingTx={loadingHandler} />
    </div>
  );
}
