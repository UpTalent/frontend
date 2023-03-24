import React from 'react';
import styles from './Skill.module.css';

export const Skill = ({ skill }) => {
	const colorList = [
		'#FFBF5B',
		'#48BDE2',
		'#F4AFB4',
		'#FE5F55',
		'#12BA60',
		'#9000B3',
	];
	const pickColor = colorList[Math.floor(Math.random() * colorList.length)];
	return (
		<div className={styles.Skill} style={{ backgroundColor: pickColor }}>
			<p>{skill}</p>
		</div>
	);
};
