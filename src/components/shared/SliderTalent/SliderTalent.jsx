import React from 'react';
import styles from './SliderTalent.module.css';
import { Skill } from '../Skill';

export const SliderTalent = ({ talent }) => {
	const skills = talent.skills
		.slice(0, 3)
		.map((skill, index) => <Skill key={index} skill={skill} />);
	return (
		<div className={styles.SliderTalent}>
			<div className={styles.talentPhoto}>
				<img
					src={talent.photo}
					alt={`${talent.firstname} ${talent.lastname}`}
				/>
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
