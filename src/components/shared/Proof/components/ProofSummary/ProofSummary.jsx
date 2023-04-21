import React from 'react';
import styles from '../../Proof.module.css';
import { ReactFitty } from 'react-fitty';
import {  KudosContainer } from '../ProofTitle/components/Kudos';

export const ProofSummary = ({
	summary,
	withKudos = false,
	kudosed_by_me,
	kudos,
	proofId
}) => {
	return (
		<div className={styles.summary}>
			<ReactFitty maxSize={40} minSize={5} wrapText={true}>
				<p>{summary}</p>
			</ReactFitty>
			{withKudos && <KudosContainer {...{ kudos, kudosed_by_me, proofId }} />}
		</div>
	);
};
