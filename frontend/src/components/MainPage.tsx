import styles from "../styles/MainPage.module.css";
export default function MainPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>
          <span>Main Page</span>
        </h1>
      </header>

      <div className={styles.buttons_container}>
        <a target={"_blank"} rel="noreferrer" href={""}>
          <div className={styles.button}>
            <p>Request Tokens</p>
          </div>
        </a>
        <a target={"_blank"} rel="noreferrer" href={""}>
          <div className={styles.button}>
            <p>My Project</p>
          </div>
        </a>
        <a target={"_blank"} rel="noreferrer" href={""}>
          <div className={styles.button}>
            <p>Cohort Projects</p>
          </div>
        </a>
      </div>
    </div>
  );
}
