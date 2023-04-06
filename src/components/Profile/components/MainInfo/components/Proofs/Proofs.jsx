import React, { useEffect, useState } from 'react';
import { Proof } from '../../../../../shared/Proof';
import styles from '../../MainInfo.module.css';
import { proofAPI } from '../../../../../../api/proofAPI';
import { LinearProgress } from '@mui/material';

export const Proofs = () => {
	const [proof, setProof] = useState(null);

	const getProof = async () => {
		try {
			const { data } = await proofAPI.getProof(1, 1);
			setProof(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getProof();
	}, []);

	return (
		<div className={styles.proofContainer}>
			{proof ? (
				<>
					<Proof proof={proof} withContent={false} showControlls={false} />
					<Proof proof={proof} withContent={true} showControlls={true} />
					<Proof proof={proof} withContent={true} showControlls={false} />
				</>
			) : (
				<LinearProgress />
			)}
		</div>
	);
};
