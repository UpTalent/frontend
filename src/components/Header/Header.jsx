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

	const handleClose = () => {
		setDropdownMenu(null);
	};

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
						<Button component={Link} onClick={handleClick}>
							{talent.firstName}
						</Button>
					</div>
					{dropdownMenu && (
						<Popover
							open={Boolean(dropdownMenu)}
							onClose={handleClose}
							anchorEl={dropdownMenu}
							anchorOrigin={{
								vertical: 'bottom',
							}}
							PaperProps={{
								style: { boxShadow: 'none' },
							}}
						>
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
								<p onClick={handleClose}>Log out</p>
							</div>
						</Popover>
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
