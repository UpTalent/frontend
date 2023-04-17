import React from 'react';
import styles from './AboutMe.module.css';
import { useOutletContext } from 'react-router-dom';

export const AboutMe = () => {
	const { aboutMe } = useOutletContext();
	return (
		<div className={styles.about}>
			{aboutMe ? (
				<b>{aboutMe}</b>
			) : (
				<b className={styles.noData}>No data provided</b>
			)}
		</div>
	);
};
