import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { profileAPI } from '../../api/profileAPI';
import { EditProfile } from '../EditProfile';
import { useSelector } from 'react-redux';
import { getAuthId, getRole } from '../../redux/reducers/authentification';
import { CircularProgress, Tooltip } from '@mui/material';
import { PhotoBlock } from './components/PhotoBlock';
import { useModalPathname } from '../../hooks/useModalPathname';

export const Profile = () => {
	const authUserId = useSelector(getAuthId);
	const userRole = useSelector(getRole);

	const [isUserProfile, setIsUserProfile] = useState(false);
	const [user, setUser] = useState(null);
	const { talentId, sponsorId } = useParams();
	const userId = talentId || sponsorId;

	const navigate = useNavigate();
	const location = useLocation();
	const modalPathname = useModalPathname();
	const profile = talentId ? 'talent' : 'sponsor';

	const getTalentProfile = async () => {
		try {
			const { data } = await profileAPI.getUser(profile, userId);
			setUser(data);
			setIsUserProfile(Number(userId) === authUserId && profile === userRole);
		} catch (err) {
			navigate('/home');
		}
	};

	useEffect(() => {
		getTalentProfile();
	}, [authUserId, userId]);

	return (
		<>
			{user ? (
				<div className={styles.profile}>
					<PhotoBlock
						isTalentProfile={isUserProfile}
						talent={user}
						talentId={userId}
						setTalent={setUser}
					/>
					<div className={styles.allInfoAbouUser}>
						<Outlet
							context={{
								user,
								isUserProfile: isUserProfile,
							}}
						/>
					</div>
					{isUserProfile && (
						<Tooltip title='Edit profile'>
							<CreateOutlinedIcon
								className={`${styles.pencil} ${styles.toEdit}`}
								onClick={() => {
									modalPathname('edit');
								}}
							/>
						</Tooltip>
					)}
					{location.pathname.endsWith('/edit') && (
						<EditProfile talent={user} setTalent={setUser} />
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
