import React from 'react';
import styles from '../../Proof.module.css';
import { ReactFitty } from 'react-fitty';
import { SkillArea } from '../SkillArea/SkillArea';

export const ProofSummary = ({
	summary,
	withKudos = false,
	sum_kudos_from_me,
	kudos,
	skills,
	proofId,
	my_proof,
}) => {
	return (
		<div className={styles.summary}>
			<ReactFitty maxSize={40} minSize={5} wrapText={true}>
				<p>{summary.trim()}</p>
			</ReactFitty>
			{withKudos && (
				<SkillArea
					skills={skills.slice(0, 3)}
					kudos={{
						sum_kudos_from_me,
						kudos,
						my_proof,
						talentView: sum_kudos_from_me,
						proofId,
					}}
					inSlider={true}
					additionalStyle={styles.skillsSlider}
				/>
			)}
		</div>
	);
};
