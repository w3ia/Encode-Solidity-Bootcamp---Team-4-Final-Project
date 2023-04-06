import React, { ReactNode } from "react";
import Navbar from "../components/navbar";
import classes from '../styles/mainLayout.module.css'

interface Props {
  children?: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className={classes.minWidth}>
      <Navbar />
      <main className={classes.mainContent}>
      {children}

      </main>
      <footer className={classes.mainLayout}>
        <a
          href="https://diplomaDAO.xyz"
          rel="noopener noreferrer"
          target="_blank"
        >
          🚀 Built by the DiplomaDAO Team 🚀{" "}
        </a>
      </footer>
    </div>
  );
}