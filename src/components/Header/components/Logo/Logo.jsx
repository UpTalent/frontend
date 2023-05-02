import React from 'react';
import styles from '../../Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/upTalent.png';

export const Logo = () => {
	return (
		<Link to='/home' className={styles.logo}>
			<img src={logo} alt='UpTalent Logo' />
			UPTALENT
		</Link>
	);
};
