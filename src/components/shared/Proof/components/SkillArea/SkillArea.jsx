import React from 'react';
import { Skill } from '../../../Skill';
import styles from './SkillArea.module.css';
import { KudosContainer } from '../ProofTitle/components/Kudos/KudosContainer';

export const SkillArea = ({
	skills,
	kudos,
	additionalStyle,
	setLocalSkills,
	inSlider,
}) => {
	return (
		<div className={`${styles.skillArea} ${additionalStyle}`}>
			<KudosContainer {...{ ...kudos, skills, setLocalSkills }} />
			<div className={styles.skillBox}>
				{skills?.map(skill => (
					<Skill
						skill={skill.name}
						inSlider={inSlider}
						key={skill.id}
						kudos={skill.kudos}
					/>
				))}
			</div>
		</div>
	);
};
