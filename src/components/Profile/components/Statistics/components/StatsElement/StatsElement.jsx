import React from 'react';
import styles from '../../Statistics.module.css';

export const StatsElement = ({ title, children }) => {
	return (
		<div className={styles.statsConatiner}>
			<h3>{title}</h3>
			{children}
		</div>
	);
};
