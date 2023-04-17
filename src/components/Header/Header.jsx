import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Button, Popover } from '@mui/material';
import styles from './Header.module.css';
import { setAuthToken } from '../../api/index';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAuthTalentId,
	getFirstName,
	getIsAuth,
	logOut,
} from '../../redux/reducers/authentification';
import logo from '../../assets/upTalent.png';
import { ReactFitty } from 'react-fitty';
import { useModalPathname } from '../../hooks/useModalPathname';


export const Header = () => {
	const dispatch = useDispatch();
	const isTalent = useSelector(getIsAuth);
	const authTalent = useSelector(getFirstName);
	const authTalentId = useSelector(getAuthTalentId);
	const modalPathname = useModalPathname();

	const [dropdownMenu, setDropdownMenu] = useState(null);
	const navigate = useNavigate();

	const handleClick = event => {
		setDropdownMenu(event.currentTarget);
	};

	return (
		<header className={styles.header}>
			<Link to='/home' className={styles.logo}>
				<img src={logo} alt='UpTalent Logo' />
				UPTALENT
			</Link>
			<div className={styles.navbar}>
				<NavLink
					className={({ isActive }) => (isActive ? styles.active : null)}
					to='/talents'
				>
					Talents
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? styles.active : null)}
					to='/proofs'
				>
					Proofs
				</NavLink>
			</div>

			{isTalent ? (
				<div className={styles.buttonGroup}>
					<div className={styles.nameButton} onClick={handleClick}>
						<Button component={Link} sx={{ textAlign: 'center' }}>
							<ReactFitty maxSize={20}>{authTalent}</ReactFitty>
						</Button>
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
								to={`talent/${authTalentId}`}
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
									dispatch(logOut());
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
