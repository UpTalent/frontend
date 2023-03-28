import React, { useContext, useEffect } from 'react';
import { Banner } from '../shared/Banner';
import { TalentAvatar } from '../shared/TalentAvatar';
import { ProfileInfo } from './components/ProfileInfo';
import styles from './Profile.module.css';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Context } from '../../context';
import { useParams } from 'react-router-dom';
import { talentsAPI } from '../../api/talentsAPI';

export const Profile = () => {
	const {
		authTalent,
		isTalentProfile,
		setIsTalentProfile,
		talent,
		setTalent
	} = useContext(Context);
	const { talentId } = useParams();

	const getTalentProfile = async () => {
		const { data } = await talentsAPI.getTalent(talentId);
		setTalent(data);
	};

	useEffect(() => {
		getTalentProfile();
	}, []);

	useEffect(() => {
		setIsTalentProfile(Number(talentId) === authTalent.id);
	}, [authTalent, talentId]);

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
			info: talent.skills.join(', '),
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
			<div className={styles.about}>
				<p>About me</p>
				<b>{talent.aboutMe}</b>
			</div>
			{isTalentProfile && <CreateOutlinedIcon className={styles.pencil} />}
		</div>
	);
};
