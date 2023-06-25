import React from 'react';
import styles from '../../../../Proof.module.css';

export const Status = ({ status }) => {
	return (
		<div className={`${styles.status} ${styles[status]}`}>
			<p>{status}</p>
		</div>
	);
};
