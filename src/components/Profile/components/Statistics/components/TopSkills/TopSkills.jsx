import React from 'react';
import styles from '../../Statistics.module.css';
import { Skill } from '../../../../../shared/Skill';
import { formatNumber } from '../../../../../../service/hooks/formatNumber';

export const TopSkills = ({ skills }) => {
	return (
		<div >
			<h3>Your top skills:</h3>
			<div className={styles.skills}>
				{skills?.map((skill, index) => (
					<div>
						<Skill
							skill={skill.name}
							key={index}
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
