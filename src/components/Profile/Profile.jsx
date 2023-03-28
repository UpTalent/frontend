import React, { useContext, useEffect, useState } from 'react';
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

// modal
import { EditProfile } from '../EditProfile';

export const Profile = () => {
	const { authTalent, isTalentProfile, setIsTalentProfile, talent, setTalent } =
		useContext(Context);
	const { talentId } = useParams();

	const getTalentProfile = async () => {
		const { data } = await talentsAPI.getTalent(talentId);
		await setTalent(data);
	};

	// make route modal
	const [showEdit, setShowEdit] = useState(false);

	useEffect(() => {
		getTalentProfile();
	}, []);

	useEffect(() => {
		setIsTalentProfile(Number(talentId) === authTalent.id);
	}, [authTalent]);

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
			header: 'I can...',
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
				{isTalentProfile && (
					<CreateOutlinedIcon
						className={`${styles.pencil} ${styles.toPhoto}`}
					/>
				)}
			</div>
			{isTalentProfile && (
				<div className={styles.toBanner}>
					<CreateOutlinedIcon />
					<p>EDIT BANNER</p>
				</div>
			)}
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
				{talent.aboutMe ? (
					<b>{talent.aboutMe}</b>
				) : (
					<b className={styles.noData}>No data provided</b>
				)}
			</div>
			{isTalentProfile && (
				<CreateOutlinedIcon
					className={`${styles.pencil} ${styles.toEdit}`}
					onClick={() => {
						setShowEdit(true);
					}}
				/>
			)}

			<EditProfile modal={showEdit} setModal={setShowEdit} />
		</div>
	);
};
