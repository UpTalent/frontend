import React, { useEffect, useState } from 'react';
import { Banner } from '../shared/Banner';
import { TalentAvatar } from '../shared/TalentAvatar';
import styles from './Profile.module.css';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { profileAPI } from '../../api/profileAPI';
import { EditProfile } from '../EditProfile';
import { PopUpMessage } from '../shared/PopUpMessage';
import { UserInfo } from './components/UserInfo';
import { MainInfo } from './components/MainInfo';
import { useSelector } from 'react-redux';
import { getAuthTalentId } from '../../redux/reducers/authentification';
import { CircularProgress, Tooltip } from '@mui/material';

export const Profile = () => {
	const authTalent = useSelector(getAuthTalentId);

	const [isTalentProfile, setIsTalentProfile] = useState(false);
	const [talent, setTalent] = useState(null);
	const { talentId } = useParams();

	const navigate = useNavigate();
	const location = useLocation();

	const systemMessage = useSelector(state => state.systemMessage.messageText);
	const modalPathname = path => {
		navigate(`${location.pathname}/${path}`);
	};

	const getTalentProfile = async () => {
		try {
			const { data } = await profileAPI.getTalent(talentId);
			setTalent(data);
			setIsTalentProfile(Number(talentId) === authTalent);
		} catch (err) {
			navigate('/home');
		}
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

	return (
		<>
			{talent ? (
				<div className={styles.profile}>
					<Banner
						banner={talent.banner}
						additionalStyle={styles.profileBanner}
					/>
					<div className={styles.photoName}>
						<TalentAvatar
							photo={talent.avatar}
							additionalStyle={styles.profilePhoto}
						/>
						<p
							className={styles.profileName}
						>{`${talent.firstname} ${talent.lastname}`}</p>
						{isTalentProfile && (
							<Tooltip title='Change photo'>
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
							</Tooltip>
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
					<div className={styles.allInfoAbouUser}>
						<UserInfo talent={talent} isTalentProfile={isTalentProfile} />
						<MainInfo
							aboutMe={talent.about_me}
							isTalentProfile={isTalentProfile}
						/>
					</div>
					{isTalentProfile && (
						<Tooltip title='Edit profile'>
							<CreateOutlinedIcon
								className={`${styles.pencil} ${styles.toEdit}`}
								onClick={() => {
									modalPathname('edit');
								}}
							/>
						</Tooltip>
					)}
					<PopUpMessage message={systemMessage} status='success' />
					<Outlet />
					{location.pathname.endsWith('/edit') && (
						<EditProfile talent={talent} setTalent={setTalent} />
					)}
				</div>
			) : (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			)}
		</>
	);
};
