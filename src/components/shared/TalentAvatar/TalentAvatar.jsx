import React from 'react';
import styles from './TalentAvatar.module.css';
import defaultIcon from '../../../assets/defaultTalent.png';
import { CircularProgress } from '@mui/material';

export const TalentAvatar = ({
	photo,
	additionalStyle,
	isFetching = false,
}) => {
	return (
		<>
			{isFetching ? (
				<div className={styles.fetching}>
					<CircularProgress />
				</div>
			) : (
				<img
					src={photo || defaultIcon}
					alt='icon'
					className={`${styles.TalentAvatar} ${additionalStyle}`}
					onError={event => {
						event.target.src = defaultIcon;
					}}
				/>
			)}
		</>
	);
};
