import styles from "../styles/Cohort.module.css";
import CohortProjectTable from "./CohortProjectTable";
import { Vote } from "./Vote";
export default function Cohort() {
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					<span>Cohort</span>
				</h1>
			</header>
      <div>
			  <CohortProjectTable />
      </div>
      <div className="m-5">
        <Vote/>
      </div>
		</div>
	);
}