import React from 'react';
import { Skill } from '../../../Skill';
import styles from './SkillArea.module.css';
import { KudosContainer } from '../ProofTitle/components/Kudos/KudosContainer';

export const SkillArea = ({
	skills,
	kudos,
	additionalStyle,
	inSlider,
	setLocalSkills,
}) => {
	return (
		<div className={`${styles.skillArea} ${additionalStyle}`}>
			<KudosContainer {...{ ...kudos, skills, setLocalSkills }} />
			<div className={styles.skillBox}>
				{skills?.map((skill, id) => (
					<Skill
						key={id}
						skill={skill.name}
						inSlider={inSlider}
						id={skill.id}
						kudos={skill.kudos}
					/>
				))}
			</div>
		</div>
	);
};
