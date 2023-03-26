import React from 'react';
import styles from './SliderTalent.module.css';
import { Skill } from '../Skill';

export const SliderTalent = ({ talent }) => {
	const skills = talent.skills
		.slice(0, 3)
		.map((skill, index) => <Skill key={index} skill={skill} />);
	const photoClass = talent.avatar ? 'null' : 'default';
	return (
		<div className={styles.SliderTalent}>
			<div className={styles.talentPhoto}>
				<img
					src={talent.avatar}
					alt={`${talent.firstname} ${talent.lastname}`}
					className={styles[photoClass]}
					onError={event => {
						event.currentTarget.className = styles.default;
					}}
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
