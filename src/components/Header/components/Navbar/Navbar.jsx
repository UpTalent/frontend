import React from 'react';
import styles from '../../Header.module.css';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
	return (
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
	);
};
