import React from 'react';
import { Skill } from '../../../Skill';
import styles from './SkillArea.module.css';
import { KudosContainer } from '../ProofTitle/components/Kudos/KudosContainer';

export const SkillArea = ({ skills, kudos, additionalStyle }) => {
	return (
		<div className={`${styles.skillArea} ${additionalStyle}`}>
			<KudosContainer {...kudos} skills={skills} />
			<div className={styles.skillBox}>
				{skills?.map(skill => (
					<Skill skill={skill.name} key={skill.id} />
				))}
			</div>
		</div>
	);
};
