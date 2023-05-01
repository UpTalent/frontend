import React from 'react';
import styles from '../../Proof.module.css';
import { ReactFitty } from 'react-fitty';
import { KudosContainer } from '../ProofTitle/components/Kudos/KudosContainer';

export const ProofSummary = ({
	summary,
	withKudos = false,
	sum_kudos_from_me,
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
					{...{ kudos, sum_kudos_from_me, proofId, my_proof, talentView: sum_kudos_from_me }}
				/>
			)}
		</div>
	);
};
