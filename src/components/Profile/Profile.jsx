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
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { profileAPI } from '../../api/profileAPI';
import { EditProfile } from '../EditProfile/EditProfile';
import { PopUpMessage } from '../shared/PopUpMessage/PopUpMessage';

export const Profile = () => {
	const { authTalent } = useContext(Context);

	const [isTalentProfile, setIsTalentProfile] = useState(false);
	const [talent, setTalent] = useState({});
	const { talentId } = useParams();

	const navigate = useNavigate();
	const location = useLocation();

	const modalPathname = path => {
		navigate(`${location.pathname}/${path}`, {
			state: { from: location.pathname },
		});
	};

	const getTalentProfile = async () => {
		const { data } = await profileAPI.getTalent(talentId);
		setTalent(data);
		setIsTalentProfile(Number(talentId) === authTalent.talent_id);
	};

	const getFileFromUser = async (photo, operation) => {
		try {
			if (photo.target.files.length) {
				const { status } = await profileAPI.uplaodPhoto(
					talentId,
					photo.target.files[0],
					operation,
				);
				if (status === 201) {
					const { data } = await profileAPI.getTalent(talentId);
					setTalent(data);
				}
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		getTalentProfile();
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
			header: 'I can...',
			info: talent.skills?.join(', '),
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
					photo={talent.avatar}
					additionalStyle={styles.profilePhoto}
				/>
				<p
					className={styles.profileName}
				>{`${talent.firstname} ${talent.lastname}`}</p>
				{isTalentProfile && (
					<label
						htmlFor='avatar'
						className={`${styles.pencil} ${styles.toPhoto}`}
					>
						<input
							id='avatar'
							type={'file'}
							onChange={file => getFileFromUser(file, 'UPLOAD_AVATAR')}
						/>
						<CreateOutlinedIcon />
					</label>
				)}
			</div>
			{isTalentProfile && (
				<label htmlFor='banner' className={styles.toBanner}>
					<input
						id='banner'
						type={'file'}
						onChange={file => getFileFromUser(file, 'UPLOAD_BANNER')}
					/>
					<CreateOutlinedIcon />
					<p>EDIT BANNER</p>
				</label>
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
				{talent.about_me ? (
					<b>{talent.about_me}</b>
				) : (
					<b className={styles.noData}>No data provided</b>
				)}
			</div>
			{isTalentProfile && (
				<CreateOutlinedIcon
					className={`${styles.pencil} ${styles.toEdit}`}
					onClick={() => {
						modalPathname('edit');
					}}
				/>
			)}
			<PopUpMessage
				message='Your profile was updated successfully!'
				status='success'
			/>
			<Outlet />
			{location.pathname.endsWith('/edit') && (
				<EditProfile
					talent={talent}
					setTalent={setTalent}
				/>
			)}
		</div>
	);
};
