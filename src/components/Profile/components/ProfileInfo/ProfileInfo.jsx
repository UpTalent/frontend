import React from 'react';
import styles from './ProfileInfo.module.css';

export const ProfileInfo = ({element, header, info}) => {
	return (
		<div className={styles.infoItem}>
            {element}
			<div className={styles.itemText}>
				<p>{header}</p>
				{info ? <b>{info}</b> : <b>No data provided</b>}
			</div>
		</div>
	);
};
