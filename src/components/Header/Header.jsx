import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
	const [isUserAccount] = useState(false);
	return (
		<header className={styles.header}>
			<Link to="" className={styles.logo}>
				UPTALENT
			</Link>
			<div className={styles.navbar}>
				<Link to>Talents</Link>
			</div>
			
      {isUserAccount ? (
        <div className={styles['name-button']}>
					<Link>
						<Button>Name</Button>
          </Link>
        </div>
				) : (
					<div className={styles.guestButtons}>
						<Button className={styles.login}>Login</Button>
						<Button variant = 'outlined' className={styles.signup}>SignUp</Button>
					</div>
				)}
		</header>
	);
};
