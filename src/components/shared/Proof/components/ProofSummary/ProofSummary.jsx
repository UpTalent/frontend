import React from 'react';
import styles from '../../Proof.module.css';

export const ProofSummary = ({ summary }) => {
	return (
		<div className={styles.summary}>
			<p>{summary}</p>
		</div>
	);
};
