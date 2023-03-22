import React from 'react';
import styles from './Skill.module.css';

export const Skill = ({ skill, color }) => {
	const colorPick = Math.random().toFixed(1) > 0.5 ? '#FFBF5B' : '#48BDE2';

	return (
		<div className={styles.Skill} style={{ backgroundColor: colorPick }}>
			<p>{skill}</p>
		</div>
	);
};
