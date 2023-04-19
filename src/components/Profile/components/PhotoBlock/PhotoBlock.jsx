import React, { useState } from 'react';
import styles from '../../Profile.module.css';
import { TalentAvatar } from '../../../shared/TalentAvatar';
import { Banner } from '../../../shared/Banner';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { profileAPI } from '../../../../api/profileAPI';
import { Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../redux/reducers/systemMessages';

export const PhotoBlock = ({
	isTalentProfile,
	talent,
	talentId,
	setTalent,
}) => {
	const [loadAvatar, setLoadAvatar] = useState(false);
	const [loadBanner, setLoadBanner] = useState(false);
	const dispatch = useDispatch();

	const getFileFromUser = async (photo, operation) => {
		operation === 'UPLOAD_AVATAR' ? setLoadAvatar(true) : setLoadBanner(true);
		try {
			if (photo.target.files.length) {
				const { status } = await profileAPI.uplaodPhoto(
					talentId,
					photo.target.files[0],
					operation,
				);
				if (status === 200) {
					const { data } = await profileAPI.getTalent(talentId);
					setTalent(data);
				}
			}
		} catch (err) {
			dispatch(setSystemMessage(true, err.message, 'error'));
		}
		operation === 'UPLOAD_AVATAR' ? setLoadAvatar(false) : setLoadBanner(false);
	};
	return (
		<>
			<Banner
				banner={talent.banner}
				additionalStyle={styles.profileBanner}
				isFetching={loadBanner}
			/>
			<div className={styles.photoName}>
				<div className={styles.photo}>
					<TalentAvatar
						photo={talent.avatar}
						additionalStyle={styles.profilePhoto}
						isFetching={loadAvatar}
					/>
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
				<p
					className={styles.profileName}
				>{`${talent.firstname} ${talent.lastname}`}</p>
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
		</>
	);
};
