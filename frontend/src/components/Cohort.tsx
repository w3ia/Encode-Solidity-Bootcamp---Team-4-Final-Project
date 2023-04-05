import styles from "../styles/MyProject.module.css";
import CohortProjectTable from "./CohortProjectTable";
import MyProjectInput from "./MyProjectInput";
import MyProjectTable from "./MyProjectTable";
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
      <div>
        <Vote/>
      </div>
		</div>
	);
}