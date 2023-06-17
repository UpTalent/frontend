import React from 'react';
import styles from './SkillBox.module.css';
import { Skill } from '../Skill/Skill';

export const SkillBox = ({ skills, inSlider, additionalStyle }) => {
	return (
		<div className={`${styles.skillBox} ${additionalStyle}`}>
			{skills?.map((skill, id) => (
				<Skill
					key={id}
					skill={skill.name}
					inSlider={inSlider}
					kudos={skill.kudos}
					id={skill.id}
				/>
			))}
		</div>
	);
};
