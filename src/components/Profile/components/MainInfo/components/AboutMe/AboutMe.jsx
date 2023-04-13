import React from 'react';
import styles from './AboutMe.module.css';

export const AboutMe = ({aboutMe}) => {
  return (
		<div className={styles.about}>
			{aboutMe ? (
				<b>{aboutMe}</b>
			) : (
				<b className={styles.noData}>No data provided</b>
			)}
		</div>
	);
}
