import React, { memo } from 'react';
import styles from './Skill.module.css';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { getAllSkills } from '../../../redux/reducers/skills';
import { DisabledText } from '../DisabledText/DisabledText';

export const Skill = memo(({ skill, kudos, inSlider, additionalStyle, id }) => {
	const helperText = [
		{ condition: Boolean(kudos), helperText: `${kudos} Kudos` },
		{ condition: skill.length > 17, helperText: skill },
	].find(el => el.condition);

	const skillColor = useSelector(getAllSkills).find(
		el => el.name === skill || el.id === id,
	)?.color;

	const mainInfo = (
		// <div className={`${fullSkill && styles.showFull}`}>
			<div
				className={`${styles.Skill} ${additionalStyle} `}
				style={{ backgroundColor: skillColor }}
			>
				<DisabledText
					condition={helperText.condition}
					helperText={helperText.helperText}
				>
					<p>{skill}</p>
				</DisabledText>
			</div>
		// </div>
	);

	return (
		<>
			{inSlider ? (
				mainInfo
			) : (
				<Badge badgeContent={kudos} color='info'>
					{mainInfo}
				</Badge>
			)}
		</>
	);
});
