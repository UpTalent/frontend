import React, { memo } from 'react';
import styles from './Skill.module.css';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { getAllSkills } from '../../../redux/reducers/skills';
import { DisabledText } from '../DisabledText/DisabledText';

export const Skill = memo(({ skill, kudos, id, inSlider }) => {
	const skillColor = useSelector(getAllSkills).find(el => el.id === id)?.color;

	const mainInfo = (
		<div className={styles.Skill} style={{ backgroundColor: skillColor }}>
			<DisabledText condition={kudos} helperText={`${kudos} Kudos`}>
				<p>{skill}</p>
				{/* <span className={styles.kudosAmount}>{kudos}</span> */}
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
