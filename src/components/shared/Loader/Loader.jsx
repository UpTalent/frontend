import React from 'react';
import styles from './Loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.loaderContainer}>
			<h1>UPTALENT</h1>
			<span class={styles.loader}></span>
		</div>
	);
};
