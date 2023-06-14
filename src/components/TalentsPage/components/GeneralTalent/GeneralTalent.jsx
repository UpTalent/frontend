import React from 'react';
import styles from './GeneralTalent.module.css';
import Button from '@mui/material/Button';
import { Skill } from '../../../shared/Skill';
import { TalentAvatar } from '../../../shared/TalentAvatar';
import { Banner } from '../../../shared/Banner';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../../../redux/reducers/authentification';
import { SkillBox } from '../../../shared/SkillBox';

export const GeneralTalent = ({ talent }) => {
	const isTalent = useSelector(getIsAuth);

	return (
		<div className={styles.GeneralTalent}>
			<Banner banner={talent.banner} />
			<TalentAvatar
				photo={talent.avatar}
				additionalStyle={styles.talentPhoto}
			/>
			<div className={styles.talentInfo}>
				<h4>{`${talent.firstname} ${talent.lastname}`}</h4>
				<SkillBox
					inSlider={true}
					skills={talent.skills.slice(0, 3)}
					additionalStyle={styles.skillBox}
				/>
				{isTalent && (
					<Button
						component={Link}
						to={`/profile/talent/${talent.id}`}
						color='dark'
						variant='contained'
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
