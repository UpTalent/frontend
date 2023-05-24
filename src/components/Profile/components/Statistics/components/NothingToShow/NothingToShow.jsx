import React from 'react';
import styles from '../../Statistics.module.css';
import sadCat from '../../../../../../assets/sadcat.png';

export const NothingToShow = () => {
	return (
		<div className={styles.NothingToShow}>
			<img src={sadCat} alt='Nothing to show' />
			<p>It seems like we lack of info...</p>
		</div>
	);
};
