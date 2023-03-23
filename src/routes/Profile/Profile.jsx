import React, { useEffect, useState } from 'react';
import { Banner } from '../../components/shared/Banner';
import { TalentAvatar } from '../../components/shared/TalentAvatar';
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
	'about me':
		'Highly-motivated Java Developer, with one year of experience practicing and learning Java, and connected technologies seeking a full-time position where I can apply my skills. I have an economic academic education and business processing background and some experience with it. All my experience will be useful in teamwork in software development. I often worked in a team, as a friendly, inquisitive but result-target person. That last thing helps me to deep learn English up to the Intermediate level, Java Core, Java 8, MySQL, JDBC, Hibernate, and Spring and take real pleasure from it, and I am inquisitive I can feel it in my future job.',
	password: 'somePassword12343',
};

export const Profile = () => {
	const [talent] = useState(testUser);
	const [isTalent] = useState(true);
	useEffect(() => console.log(talent), []);
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
				<ProfileInfo
					element={<LocationOnOutlinedIcon />}
					header={'Location'}
					info={talent.location}
				/>
				{isTalent && (
					<ProfileInfo
						element={<CakeOutlinedIcon />}
						header={'Birthday'}
						info={talent.birthday}
					/>
				)}
				<ProfileInfo
					element={<AutoAwesomeIcon />}
					header={'Skills'}
					info={talent.skills.join(', ')}
				/>
				{isTalent && (
					<ProfileInfo
						element={<AlternateEmailOutlinedIcon />}
						header={'Email'}
						info={talent.email}
					/>
				)}
			</div>
			<div className={styles.about}>
				<p>About me</p>
				<b>{talent['about me']}</b>
			</div>
			<CreateOutlinedIcon className={styles.pencil} />
		</div>
	);
};
