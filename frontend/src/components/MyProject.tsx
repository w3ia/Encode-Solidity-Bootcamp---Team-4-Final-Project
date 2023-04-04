import styles from "../styles/MyProject.module.css";
export default function MyProject() {
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					<span>My Project</span>
				</h1>
				<p>
					To Do - List projects
				</p>
			</header>

		</div>
	);
}