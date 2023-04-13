import React from 'react';
import styles from './SliderTalent.module.css';
import { Skill } from '../../Skill';
import { TalentAvatar } from '../../TalentAvatar';

export const SliderTalent = ({ talent }) => {
	const skills = talent.skills
		.slice(0, 3)
		.map((skill, index) => <Skill key={index} skill={skill} />);
	return (
		<div className={styles.SliderTalent}>
			<div className={styles.talentPhoto}>
				<TalentAvatar photo={talent.avatar} additionalStyle={styles.avatar} />
			</div>

			<div className={styles.talentInfo}>
				<p
					className={styles.talentName}
				>{`${talent.firstname} ${talent.lastname}`}</p>
				<div className={styles.skillBox}>{skills}</div>
			</div>
		</div>
	);
};
