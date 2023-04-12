import React from 'react';
import styles from '../../Proof.module.css';

export const ProofBody = ({ content }) => {
	return (
		<div className={styles.content}>
			<p>{content}</p>
		</div>
	);
};
