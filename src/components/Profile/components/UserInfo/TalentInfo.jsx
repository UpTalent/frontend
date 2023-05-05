import React from 'react';
import styles from './UserInfo.module.css';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { ProfileInfo } from './ProfileInfo';
import { Skill } from '../../../shared/Skill';

export const TalentInfo = ({ talent, isTalentProfile }) => {
	const infoAboutUser = [
		{
			icon: <LocationOnOutlinedIcon />,
			header: 'Location',
			info: talent.location,
			visiableForGuest: true,
		},
		{
			icon: <CakeOutlinedIcon />,
			header: 'Birthday',
			info: talent.birthday,
			visiableForGuest: isTalentProfile,
		},
		{
			icon: <AutoAwesomeIcon />,
			header: 'Skills',
			info:
				talent.skills.length > 0 ? (
					<div className={styles.skills}>
						{talent.skills?.map(el => (
							<Skill skill={el.name} key={el.id} />
						))}
					</div>
				) : null,
			visiableForGuest: true,
		},
		{
			icon: <AlternateEmailOutlinedIcon />,
			header: 'Email',
			info: talent.email,
			visiableForGuest: isTalentProfile,
		},
	];
	return (
		<div className={styles.info}>
			{infoAboutUser.map(
				(el, i) =>
					el.visiableForGuest && (
						<ProfileInfo
							key={i}
							element={el.icon}
							header={el.header}
							info={el.info}
						/>
					),
			)}
		</div>
	);
};
