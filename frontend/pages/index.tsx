import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { RootLayout } from '../components/RootLayout';
import { useState } from 'react';
import Main from './Main';
import Projects from './projects';
import Cohort from './cohort';
import Login from './Login';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
};

export default Home;
