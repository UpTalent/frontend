import React from 'react';
import styles from '../../Statistics.module.css';
import { Skill } from '../../../../../shared/Skill';
import { formatNumber } from '../../../../../../service/hooks/formatNumber';

export const TopSkills = ({ skills }) => {
	return (
		<div className={styles.skillArea}>
			<h3>Your top skills:</h3>
			<div className={styles.skills}>
				{skills?.map((skill, index) => (
					<div className={styles.skillItem} key={index}>
						<Skill
							skill={skill.name}
							inSlider={true}
							additionalStyle={styles[`top${index}`]}
						/>
						<p>{formatNumber(skill.kudos)} Kudos</p>
					</div>
				))}
			</div>
		</div>
	);
};
