import { Box } from './Box';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  Navbar,
  Dropdown,
  Button,
  Link,
  Text,
  useTheme,
} from '@nextui-org/react';
import { DiplomaLogo } from '../components/DiplomaLogo';
import { icons } from '../components/Icons';
import { useRouter } from 'next/router';
import '../styles/RootLayout.module.css';

export const RootLayout = ({ children }) => {
  const router = useRouter();
  console.log(router.pathname)

  return (
    <div className={styles.container}>
      <Box
        css={{
          maxW: '100%',
        }}
      >
        <Navbar isBordered variant='sticky'>
          <Navbar.Brand>
            <DiplomaLogo />
            <Text b color='inherit' hideIn='xs'>
              DiplomaDAO
            </Text>
          </Navbar.Brand>
          <Navbar.Content
            enableCursorHighlight
            activeColor='secondary'
            hideIn='xs'
            variant='underline'
          >
            <Navbar.Link
              className={router.pathname === '/main' ? 'active' : ''}
              href='/Main'
            >
              Main
            </Navbar.Link>
            <Navbar.Link
              className={router.pathname === '/Projects' ? 'active' : ''}
              href='/Projects'
            >
              My Project
            </Navbar.Link>
            <Navbar.Link
              className={router.pathname === '/Cohorts' ? 'active' : ''}
              href='/Cohort'
            >
              Cohort
            </Navbar.Link>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Item>
              <ConnectButton />
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
        {children}
        <footer className={styles.footer}>
          <a
            href='https://diplomaDAO.xyz'
            rel='noopener noreferrer'
            target='_blank'
          >
            🚀 Built by the DiplomaDAO Team 🚀{' '}
          </a>
        </footer>
      </Box>
    </div>
  );
};
