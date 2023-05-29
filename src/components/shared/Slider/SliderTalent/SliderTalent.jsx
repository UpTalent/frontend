import React from 'react';
import styles from './SliderTalent.module.css';
import { Skill } from '../../Skill';
import { TalentAvatar } from '../../TalentAvatar';

export const SliderTalent = ({ talent }) => {
	const bannerStyle = {
		backgroundImage: talent.banner
			? `url(${talent.banner})`
			: 'linear-gradient(87.27deg, #9cdaed 3.18%, #0093c1 63.05%)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	};

	const skills = talent.skills
		.slice(0, 3)
		.map(skill => (
			<Skill
				key={skill.id}
				skill={
					skill.name.length > 12
						? skill.name.substring(0, 12) + '...'
						: skill.name
				}
				id={skill.id}
			/>
		));
	return (
		<div className={styles.SliderTalent}>
			<div className={styles.talentPhoto} style={bannerStyle}>
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
