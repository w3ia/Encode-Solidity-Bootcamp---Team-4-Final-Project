import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Button } from '@nextui-org/react';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DiplomaDAO</title>
        <meta
          content="DiplomaDAO"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className={styles.main}>
        
        <h2 className={styles.title}>
          Welcome to DiplomaDAO
        </h2>
        <ConnectButton />
      </main>
      <footer className={styles.footer}>
        <a href="https://diplomaDAO.xyz" rel="noopener noreferrer" target="_blank">
        DiplomaDAO        </a>
      </footer>
    </div>
  );
};

export default Home;
