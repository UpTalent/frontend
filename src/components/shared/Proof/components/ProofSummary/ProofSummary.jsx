import React from 'react';
import styles from '../../Proof.module.css';
import { ReactFitty } from 'react-fitty';

export const ProofSummary = ({ summary }) => {
	return (
		<div className={styles.summary}>
			<ReactFitty maxSize={40} minSize={5} >
				<p>{summary}</p>
			</ReactFitty>
		</div>
	);
};
