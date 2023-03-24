import React, { useState } from 'react';
import { Banner } from '../shared/Banner';
import { TalentAvatar } from '../shared/TalentAvatar';
import { ProfileInfo } from './components/ProfileInfo';
import styles from './Profile.module.css';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const testUser = {
	id: 1,
	banner: null,
	photo: null,
	firstname: 'Alice',
	lastname: 'Smith',
	email: 'alice.smith@gmail.com',
	skills: ['Java', 'JS', 'Time management'],
	birthday: '1997-10-31',
	location: 'Ukraine, Kharkiv',
	aboutMe:
		'Highly-motivated Java Developer, with one year of experience practicing and learning Java, and connected technologies seeking a full-time position where I can apply my skills. I have an economic academic education and business processing background and some experience with it. All my experience will be useful in teamwork in software development. I often worked in a team, as a friendly, inquisitive but result-target person. That last thing helps me to deep learn English up to the Intermediate level, Java Core, Java 8, MySQL, JDBC, Hibernate, and Spring and take real pleasure from it, and I am inquisitive I can feel it in my future job.',
	password: 'somePassword12343',
};

export const Profile = () => {
	const [talent] = useState(testUser);
	const [isTalent] = useState(true);
	const infoAboutUser = [
		{
			icon: <LocationOnOutlinedIcon />,
			header: 'Location',
			info: talent.location,
			unvisiableForGuest: true,
		},
		{
			icon: <CakeOutlinedIcon />,
			header: 'Birthday',
			info: talent.birthday,
			unvisiableForGuest: isTalent,
		},
		{
			icon: <AutoAwesomeIcon />,
			header: 'Skills',
			info: talent.skills.join(', '),
			unvisiableForGuest: true,
		},
		{
			icon: <AlternateEmailOutlinedIcon />,
			header: 'Email',
			info: talent.email,
			unvisiableForGuest: isTalent,
		},
	];
	return (
		<div className={styles.profile}>
			<Banner banner={talent.banner} additionalStyle={styles.profileBanner} />
			<div className={styles.photoName}>
				<TalentAvatar
					photo={talent.photo}
					additionalStyle={styles.profilePhoto}
				/>
				<p
					className={styles.profileName}
				>{`${talent.firstname} ${talent.lastname}`}</p>
			</div>
			<div className={styles.info}>
				{infoAboutUser.map(
					el =>
						el.unvisiableForGuest && (
							<ProfileInfo
								element={el.icon}
								header={el.header}
								info={el.info}
							/>
						),
				)}
			</div>
			<div className={styles.about}>
				<p>About me</p>
				<b>{talent.aboutMe}</b>
			</div>
			{isTalent && <CreateOutlinedIcon className={styles.pencil} />}
		</div>
	);
};
