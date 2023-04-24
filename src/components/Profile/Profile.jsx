import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { profileAPI } from '../../api/profileAPI';
import EditTalent from '../EditProfile/EditTalent';
import { UserInfo } from './components/UserInfo';
import { useSelector } from 'react-redux';
import { getAuthId } from '../../redux/reducers/authentification';
import { CircularProgress, Tooltip } from '@mui/material';
import { PhotoBlock } from './components/PhotoBlock';
import { useModalPathname } from '../../hooks/useModalPathname';
import EditSponsor from '../EditSponsor/EditSponsor';

export const Profile = () => {
	// delete
	const [sponsor, setSponsor] = useState(sponsor1);
	//
	const authTalent = useSelector(getAuthId);

	const [isTalentProfile, setIsTalentProfile] = useState(false);
	const [talent, setTalent] = useState(null);
	const { talentId } = useParams();

	const navigate = useNavigate();
	const location = useLocation();
	const modalPathname = useModalPathname();

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
					<PhotoBlock
						isTalentProfile={isTalentProfile}
						talent={talent}
						talentId={talentId}
						setTalent={setTalent}
					/>
					<div className={styles.allInfoAbouUser}>
						<UserInfo talent={talent} isTalentProfile={isTalentProfile} />
						<Outlet context={{ aboutMe: talent.about_me, isTalentProfile }} />
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
					{location.pathname.endsWith('/edit') && (
						<EditTalent user={talent} setUser={setTalent} />
					)}
					<EditSponsor user={sponsor} setUser={setSponsor} />
				</div>
			) : (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			)}
		</>
	);
};

const sponsor1 = {
	fullname: 'Some company',
	kudos: 50,
};

const sponsor2 = {
	fullname: 'Rich person',
	kudos: 25,
};
