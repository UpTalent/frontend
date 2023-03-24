import React from 'react';
import styles from './GeneralTalent.module.css';
import Button from '@mui/material/Button';
import { Skill } from '../../../../components/shared/Skill';
import { TalentAvatar } from '../../../../components/shared/TalentAvatar';
import { Banner } from '../../../../components/shared/Banner';
import { Link } from 'react-router-dom';

export const GeneralTalent = ({ talent, isTalent }) => {
	const skills = talent.skills
		.slice(0, 3)
		.map((skill, index) => <Skill key={index} skill={skill} />);
	return (
		<div className={styles.GeneralTalent}>
			<Banner banner={talent.banner} />
			<TalentAvatar photo={talent.photo} additionalStyle={styles.talentPhoto} />
			<div className={styles.talentInfo}>
				<p>{`${talent.firstname} ${talent.lastname}`}</p>
				<div className={styles.skillBox}>{skills}</div>
				{isTalent && (
					<Button
						component={Link}
						to={`/talent/${talent.id}`}
						color="dark"
						variant="contained"
						sx={{
							'&:hover': {
								backgroundColor: '#fff',
								outline: '1px solid #48BDE2',
								color: '#48BDE2',
								boxShadow: 'none',
							},
						}}
					>
						Check Profile
					</Button>
				)}
			</div>
		</div>
	);
};
