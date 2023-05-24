import React from 'react';
import styles from '../../Statistics.module.css';
import { Skill } from '../../../../../shared/Skill';
import { formatNumber } from '../../../../../../service/hooks/formatNumber';
import { StatsElement } from '../StatsElement/StatsElement';
import { NothingToShow } from '../NothingToShow/NothingToShow';
import place0 from '../../.../../../../../../assets/first.png';
import place1 from '../../.../../../../../../assets/second.png';
import place2 from '../../.../../../../../../assets/third.png';

export const TopSkills = ({ skills }) => {
	const medals = [place0, place1, place2];

	const topSkills = skills?.map((skill, index) => (
		<div
			className={styles.skillItem}
			key={index}
			style={{ animationDelay: `${((index * 2) / 10).toFixed(2)}s` }}
		>
			<img src={medals[index]} alt='medal' />
			<Skill
				skill={skill.name}
				inSlider={true}
				additionalStyle={styles[`top${index}`] + ` ${styles.skill}`}
			/>
			<p>{formatNumber(skill.kudos)} Kudos</p>
		</div>
	));
	return (
		<StatsElement title={'top skills:'} info={skills}>
			<div className={styles.skills}>
				{topSkills.length ? topSkills : <NothingToShow />}
			</div>
		</StatsElement>
	);
};
