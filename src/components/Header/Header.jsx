import React, { useState } from 'react';
import styles from './Header.module.css';
import { HeaderDrawer } from './components/HeaderDrawer/HeaderDrawer';
import { Navbar } from './components/Navbar/Navbar';
import { AuthButtons } from './components/AuthButtons/AuthButtons';
import { Logo } from './components/Logo/Logo';
import { useMediaQuery } from '@mui/material';

export const Header = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const mobile = useMediaQuery(theme => theme.breakpoints.up('md'));
	return (
		<header className={styles.header}>
			<Logo />
			{!mobile ? (
				<div>
					<HeaderDrawer {...{ mobileOpen, setMobileOpen }} />
				</div>
			) : (
				<>
					<Navbar />
					<AuthButtons />
				</>
			)}
		</header>
	);
};
