import React from 'react';
import styles from './ProfileInfo.module.css';

export const ProfileInfo = ({element, header, info}) => {
	return (
		<div className={styles.infoItem}>
            {element}
			<div className={styles.itemText}>
				<p>{header}</p>
				<b>{info}</b>
			</div>
		</div>
	);
};
