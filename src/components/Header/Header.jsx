import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	logOut,
	getAuthUser,
} from '../../redux/reducers/authentification';
import logo from '../../assets/upTalent.png';
import { ReactFitty } from 'react-fitty';
import { useModalPathname } from '../../hooks/useModalPathname';

export const Header = () => {
	const dispatch = useDispatch();
	const authUser = useSelector(getAuthUser);

	const modalPathname = useModalPathname();
	const navigate = useNavigate();

	const [dropdownMenu, setDropdownMenu] = useState(null);
	const open = Boolean(dropdownMenu);

	const handleClick = event => {
		event.preventDefault();
		setDropdownMenu(event.currentTarget);
	};
	const handleClose = () => {
		setDropdownMenu(null);
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

			{authUser.isAuth ? (
				<div className={styles.buttonGroup}>
					<div className={styles.nameButton}>
						<Button
							component={Link}
							onClick={handleClick}
							sx={{ textAlign: 'center' }}
						>
							<ReactFitty maxSize={20}>{authUser.name}</ReactFitty>
						</Button>
						<Menu
							anchorEl={dropdownMenu}
							open={open}
							onClose={handleClose}
							sx={{
								'& .MuiMenu-list': {
									padding: 0,
								},
								'& .MuiPaper-root': {
									background: 'transparent',
									boxShadow: 'none',
								},
								'& .MuiMenuItem-root': {
									padding: 0,
									borderRadius: 10,
								},
							}}
						>
							<MenuItem onClick={handleClose}>
								<Link to={`${authUser.role}/${authUser.id}`} className={styles.menuItem}>
									<p>Your profile</p>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<div
									className={styles.menuItem}
									onClick={() => {
										dispatch(logOut());
										navigate('/home');
									}}
								>
									<p>Log out</p>
								</div>
							</MenuItem>
						</Menu>
					</div>
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
