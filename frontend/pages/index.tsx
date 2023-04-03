import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Navbar, Dropdown, Button, Link, Text, useTheme } from "@nextui-org/react";
import { Layout } from "../components/Layout";
import { DiplomaLogo } from "../components/DiplomaLogo";
import { icons } from "../components/Icons";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>

          <DiplomaLogo />
          <Text b color="inherit" hideIn="xs">
             DiplomaDAO
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="underline"
        >
          
          <Navbar.Link isActive href="#">
            Main
          </Navbar.Link>
          <Navbar.Link href="#">My Project</Navbar.Link>
          <Navbar.Link href="#">Cohort</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          
          <Navbar.Item>
          <ConnectButton />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>

      <footer className={styles.footer}>
        <a href="https://diplomaDAO.xyz" rel="noopener noreferrer" target="_blank">
        🚀 Built by the DiplomaDAO Team 🚀     </a>
      </footer>
    </div>
  );
};

export default Home;
