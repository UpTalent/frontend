import React from 'react';
import styles from './Loader.module.css';
import logo from '../../../assets/upTalent.png';

export const Loader = () => {
	return (
		<div className={styles.loaderContainer}>
			<div className={styles.logo}>
				<img src={logo} alt='UpTalent Logo' />
				<h1>UPTALENT</h1>
			</div>
			<span className={styles.loader}></span>
		</div>
	);
};
