import styles from "../styles/Cohort.module.css";
export default function Cohort() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>
          <span>Cohort</span>
        </h1>
        <p>Todo List cohort projects</p>
      </header>
    </div>
  );
}