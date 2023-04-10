import React, { useState } from 'react';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
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
import logo from '../../assets/upTalent.png'

export const Header = () => {
	const dispatch = useDispatch();
	const isTalent = useSelector(getIsAuth);
	const authTalent = useSelector(getFirstName);
	const authTalentId = useSelector(getAuthTalentId);

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
				<img src={logo} alt='UpTalent Logo'/>
				UPTALENT
			</Link>
			<div className={styles.navbar}>
				<NavLink className={({isActive}) => isActive ? styles.active : null} to='/talents'>Talents</NavLink>
				<NavLink className={({isActive}) => isActive ? styles.active : null} to='/proofs'>Proofs</NavLink>
			</div>

			{isTalent ? (
				<div className={styles.buttonGroup}>
					<div className={styles.nameButton} onClick={handleClick}>
						<Button component={Link}>{authTalent}</Button>
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
