import React from 'react';
import styles from '../../Proof.module.css';
import { ReactFitty } from 'react-fitty';
import {  KudosContainer } from '../ProofTitle/components/Kudos';

export const ProofSummary = ({
	summary,
	withKudos = false,
	is_pressed,
	kudos,
}) => {
	return (
		<div className={styles.summary}>
			<ReactFitty maxSize={40} minSize={5}>
				<p>{summary}</p>
			</ReactFitty>
			{withKudos && <KudosContainer {...{ kudos, is_pressed }} />}
		</div>
	);
};
