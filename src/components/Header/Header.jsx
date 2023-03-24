import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './Header.module.css';
import { Context } from '../../context';

export const Header = () => {
	const { isTalent, setIsTalent, talent, setIsTalentProfile } =
		useContext(Context);
	const [menuVisibility, setVisibility] = useState(false);

	const navigate = useNavigate();
	return (
		<header className={styles.header}>
			<Link to='' className={styles.logo}>
				UPTALENT
			</Link>
			<div className={styles.navbar}>
				<Link to='talents'>Talents</Link>
			</div>

			{isTalent ? (
				<div className={styles.buttonGroup}>
					<div className={styles.nameButton}>
						<Button
							component={Link}
							onClick={() => setVisibility(prev => !prev)}
						>
							{talent.firstName}
						</Button>
					</div>
					{menuVisibility && (
						<div className={styles.menu}>
							<Link
								to={`talent/${talent.id}`}
								className={styles.menuItem}
								onClick={() => setIsTalentProfile(true)}
							>
								<p>Talent's profile</p>
							</Link>
							<div
								className={styles.menuItem}
								onClick={() => {
									setIsTalent(false);
									navigate('/');
								}}
							>
								<p>Log out</p>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className={styles.guestButtons}>
					<Button className={styles.login} onClick={() => setIsTalent(true)}>
						Login
					</Button>
					<Button variant='outlined'>SignUp</Button>
				</div>
			)}
		</header>
	);
};
