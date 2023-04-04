import styles from "../styles/LoginComponent.module.css";
export default function LoginComponent() {
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					<span>Diploma Guild</span>
				</h1>
				<p>
					Connect wallet to get started.
				</p>
			</header>
		</div>
	);
}