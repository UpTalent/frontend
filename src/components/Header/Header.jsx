import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Popover } from '@mui/material';
import styles from './Header.module.css';
import { Context } from '../../context';
import { setAuthToken } from '../../api/index';

export const Header = () => {
	const { isTalent, setIsTalent, authTalent } = useContext(Context);
	const [dropdownMenu, setDropdownMenu] = useState(null);

	const location = useLocation();
	const navigate = useNavigate();

	const modalPathname = path => {
		navigate({
			pathname: `${location.pathname}/${path}`,
			search: location.search,
		});
	};

	const handleClick = event => {
		setDropdownMenu(event.currentTarget);
	};

	return (
		<header className={styles.header}>
			<Link to='/home' className={styles.logo}>
				UPTALENT
			</Link>
			<div className={styles.navbar}>
				<Link to='/talents'>Talents</Link>
			</div>

			{isTalent ? (
				<div className={styles.buttonGroup}>
					<div className={styles.nameButton} onClick={handleClick}>
						<Button component={Link}>{authTalent.firstname}</Button>
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
								to={`talent/${authTalent.talent_id}`}
								className={styles.menuItem}
								onClick={() => {
									setDropdownMenu(null);
								}}
							>
								<p>Talent's profile</p>
							</Link>
							<div
								className={styles.menuItem}
								onClick={() => {
									setIsTalent(false);
									setDropdownMenu(null);
									setAuthToken();
									navigate('/home');
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
							modalPathname('login');
						}}
					>
						Log In
					</Button>
					<Button
						variant='outlined'
						onClick={() => {
							modalPathname('register');
						}}
					>
						Register
					</Button>
				</div>
			)}
		</header>
	);
};
