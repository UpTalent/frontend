import React, { useState } from 'react';
import styles from '../../Header.module.css';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ReactFitty } from 'react-fitty';
import { useModalPathname } from '../../../../service/hooks/useModalPathname';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAuthUser,
	logOut,
} from '../../../../redux/reducers/authentification';

export const AuthButtons = () => {
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
		<>
			{authUser.isAuth ? (
				<div className={styles.buttonGroup}>
					<div className={styles.nameButton}>
						<Button
							component={Link}
							onClick={handleClick}
							sx={{ textAlign: 'center', alignItems: 'center' }}
						>
							<ReactFitty maxSize={20} minSize={5}>
								{authUser.name}
							</ReactFitty>
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
								<Link
									to={`profile/${authUser.role}/${authUser.id}`}
									className={styles.menuItem}
								>
									<p>Your profile</p>
								</Link>
							</MenuItem>
							{authUser.role === 'talent' && (
								<MenuItem onClick={handleClose}>
									<Link
										to={`talent/${authUser.id}/responses`}
										className={styles.menuItem}
									>
										<p>Responses</p>
									</Link>
								</MenuItem>
							)}
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
		</>
	);
};
