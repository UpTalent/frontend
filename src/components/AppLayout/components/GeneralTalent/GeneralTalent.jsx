import React from 'react';
import styles from './GeneralTalent.module.css';
import Button from '@mui/material/Button';
import { Skill } from '../../../shared/Skill';
import { TalentAvatar } from '../../../shared/TalentAvatar/TalentAvatar';


export const GeneralTalent = ({ talent, isTalent }) => {
	const skills = talent.skills.map((skill, index) => (
		<Skill key={index} skill={skill}/>
	));
	return (
		<div className={styles.GeneralTalent}>
			<div className={styles.banner}>
				{talent.banner && <img src={talent.banner} alt="banner" />}
			</div>
			<TalentAvatar photo={talent.photo} additionalStyle={styles.talentPhoto}/>
			<div className={styles.talentInfo}>
				<p>{`${talent.firstname} ${talent.lastname}`}</p>
				<div className={styles.skillBox}>{skills}</div>
				{isTalent && (
					<Button color="dark" variant="contained" >
						Check Profile
					</Button>
				)}
			</div>
		</div>
	);
};

