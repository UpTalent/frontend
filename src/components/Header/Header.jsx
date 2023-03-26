import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Popover } from '@mui/material';
import styles from './Header.module.css';
import { Context } from '../../context';

export const Header = () => {
	const { isTalent, setIsTalent, talent, setIsTalentProfile } =
		useContext(Context);
	const [dropdownMenu, setDropdownMenu] = useState(null);

	const handleClick = event => {
		setDropdownMenu(event.currentTarget);
	};

	const navigate = useNavigate();
	return (
		<header className={styles.header}>
			<Link to="" className={styles.logo}>
				UPTALENT
			</Link>
			<div className={styles.navbar}>
				<Link to="talents">Talents</Link>
			</div>

			{isTalent ? (
				<div className={styles.buttonGroup}>
					<div className={styles.nameButton} onClick={handleClick}>
						<Button component={Link}>{talent.firstName}</Button>
					</div>
					{dropdownMenu && (
						<Popover
							open={Boolean(dropdownMenu)}
							onClose={() => setDropdownMenu(null)}
							anchorEl={dropdownMenu}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 1,
							}}
							PaperProps={{
								style: { boxShadow: 'none', background: 'transparent' },
							}}
						>
							<Link
								to={`talent/${talent.id}`}
								className={styles.menuItem}
								onClick={() => {
									setDropdownMenu(null);
									setIsTalentProfile(true);
								}}
							>
								<p>Talent's profile</p>
							</Link>
							<div
								className={styles.menuItem}
								onClick={() => {
									setIsTalent(false);
									setDropdownMenu(null);
									navigate('/');
								}}
							>
								<p>Log out</p>
							</div>
						</Popover>
					)}
				</div>
			) : (
				<div className={styles.guestButtons}>
					<Button
						className={styles.login}
						onClick={() => {
							navigate('/login');
						}}
						// state={{ background: location }}
					>
						Login
					</Button>
					<Button variant="outlined">SignUp</Button>
				</div>
			)}
		</header>
	);
};
