import styles from "../styles/MyProject.module.css";
import MyProjectInput from "./MyProjectInput";
import MyProjectTable from "./MyProjectTable";
export default function MyProject() {
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					<span>My Project</span>
				</h1>
			</header>
			<MyProjectTable />
			<MyProjectInput />

		</div>
	);
}