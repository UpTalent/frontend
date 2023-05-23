import React from 'react';
import styles from '../../Statistics.module.css';
import { Skill } from '../../../../../shared/Skill';
import { formatNumber } from '../../../../../../service/hooks/formatNumber';
import { StatsElement } from '../StatsElement/StatsElement';

export const TopSkills = ({ skills }) => {
	return (
		<StatsElement title={'top skills:'}>
			<div className={styles.skills}>
				{skills?.map((skill, index) => (
					<div className={styles.skillItem} key={index}>
						<Skill
							skill={skill.name}
							inSlider={true}
							additionalStyle={styles[`top${index}`] + ` ${styles.skill}`}
						/>
						<p>{formatNumber(skill.kudos)} Kudos</p>
					</div>
				))}
			</div>
		</StatsElement>
	);
};
