import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './Header.module.css';

export const Header = () => {
	const [isUserAccount] = useState(true);
	const [menuVisibility, setVisibility] = useState(true);
	return (
		<header className={styles.header}>
			<Link to="" className={styles.logo}>
				UPTALENT
			</Link>
			<div className={styles.navbar}>
				<Link to>Talents</Link>
			</div>

			{isUserAccount ? (
				<div className={styles.buttongroup}>
					<div className={styles['name-button']}>
						<Link>
							<Button onClick={() => setVisibility(prev => !prev)}>Name</Button>
						</Link>
					</div>
					{menuVisibility && (
						<div className={styles.menu}>
							<div className={styles['menu-item']}>
								<p>Talent's profile</p>{' '}
							</div>
							<div className={styles['menu-item']}>
								<p>Log out</p>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className={styles.guestButtons}>
					<Button className={styles.login}>Login</Button>
					<Button variant="outlined">SignUp</Button>
				</div>
			)}
		</header>
	);
};
