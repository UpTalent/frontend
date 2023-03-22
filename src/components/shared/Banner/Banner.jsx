import React from 'react';
import styles from './Banner.module.css';

export const Banner = ({ banner }) => {
	return (
		<div className={styles.banner}>
			{banner && <img src={banner} alt="banner" />}
		</div>
	);
};
