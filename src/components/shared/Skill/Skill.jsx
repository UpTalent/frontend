import React, { memo } from 'react';
import styles from './Skill.module.css';

export const Skill = memo(({ skill }) => {
	const colorList = [
		'#FFBF5B',
		'#449DD1',
		'#F4AFB4',
		'#FE5F55',
		'#12BA60',
		'#9000B3',
		'#E3655B',
		'#C84630',
		'#09E85E',
		'#D67AB1',
		'#FFA938',
		'#0D69FF',
		'#A42CD6',
	];
	const pickColor = colorList[Math.floor(Math.random() * colorList.length)];
	return (
		<div className={styles.Skill} style={{ backgroundColor: pickColor }}>
			<p>{skill.name}</p>
		</div>
	);
});
