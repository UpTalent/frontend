import React from 'react';
import styles from './SkillArea.module.css';
import { KudosContainer } from '../ProofTitle/components/Kudos/KudosContainer';
import { SkillBox } from '../../../SkillBox';

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
			<SkillBox {...{ inSlider, skills }} />
		</div>
	);
};
