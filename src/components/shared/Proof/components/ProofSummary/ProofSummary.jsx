import React from 'react';
import styles from '../../Proof.module.css';
import { ReactFitty } from 'react-fitty';
import { KudosContainer } from '../ProofTitle/components/Kudos/KudosContainer';

export const ProofSummary = ({
	summary,
	withKudos = false,
	kudosed_by_me,
	kudos,
	proofId,
	my_proof,
}) => {
	return (
		<div className={styles.summary}>
			<ReactFitty maxSize={40} minSize={5} wrapText={true}>
				<p>{summary.trim()}</p>
			</ReactFitty>
			{withKudos && (
				<KudosContainer
					{...{ kudos, kudosed_by_me, proofId, my_proof, talentView: summary }}
				/>
			)}
		</div>
	);
};
