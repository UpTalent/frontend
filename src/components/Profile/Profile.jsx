import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { profileAPI } from '../../api/profileAPI';
import { EditProfile } from '../EditProfile';
import { UserInfo } from './components/UserInfo';
import { MainInfo } from './components/MainInfo';
import { useSelector } from 'react-redux';
import { getAuthTalentId } from '../../redux/reducers/authentification';
import { CircularProgress, Tooltip } from '@mui/material';
import { PhotoBlock } from './components/PhotoBlock';

export const Profile = () => {
	const authTalent = useSelector(getAuthTalentId);

	const [isTalentProfile, setIsTalentProfile] = useState(false);
	const [talent, setTalent] = useState(null);
	const { talentId } = useParams();

	const navigate = useNavigate();
	const location = useLocation();

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

	useEffect(() => {
		getTalentProfile();
	}, [authTalent, talentId]);

	return (
		<>
			{talent ? (
				<div className={styles.profile}>
					<PhotoBlock isTalentProfile={isTalentProfile} talent={talent} talentId={talentId} setTalent={setTalent}/>
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
