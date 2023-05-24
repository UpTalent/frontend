import React, { memo } from 'react';
import styles from './Skill.module.css';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { getAllSkills } from '../../../redux/reducers/skills';
import { DisabledText } from '../DisabledText/DisabledText';

export const Skill = memo(({ skill, kudos, inSlider, additionalStyle }) => {
	const skillColor = useSelector(getAllSkills).find(el => el.name === skill)?.color;

	const mainInfo = (
		<div className={`${styles.Skill} ${additionalStyle}`} style={{ backgroundColor: skillColor }}>
			<DisabledText condition={kudos} helperText={`${kudos} Kudos`}>
				<p>{skill}</p>
			</DisabledText>
		</div>
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
