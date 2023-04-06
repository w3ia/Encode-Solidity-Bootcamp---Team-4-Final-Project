import { SetStateAction, useState } from "react";
import styles from "../styles/Cohort.module.css";
import CohortProjectTable from "./CohortProjectTable";
import LoadingAlert from "./LoadingAlert";
import Vote from "./Vote";
export default function Cohort() {
	const [isTxLoading, setIsTxLoading] = useState("");

	const loadingHandler = (action: SetStateAction<string>) => {
		setIsTxLoading(action);
	  };
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					<span>Cohort</span>
				</h1>
				{isTxLoading && (
          <div className="mt-10">
            <LoadingAlert message={isTxLoading}/>
          </div>
        )}
			</header>
      <div>
			  <CohortProjectTable />
      </div>
      <div className="m-5">
        <Vote waitingTx={loadingHandler}/>
      </div>
		</div>
	);
}