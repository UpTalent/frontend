import React from 'react';
import styles from '../../Header.module.css';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
	const WithActiveNav = ({ to, linkName }) => (
		<NavLink
			className={({ isActive }) => (isActive ? styles.active : null)}
			to={`/${to}`}
		>
			{linkName}
		</NavLink>
	);
	return (
		<div className={styles.navbar}>
			<WithActiveNav to={'talents'} linkName={'Talents'} />
			<WithActiveNav to={'proofs'} linkName={'Proof'} />
			<WithActiveNav to={'vacancies'} linkName={'Vacancies'} />
		</div>
	);
};
