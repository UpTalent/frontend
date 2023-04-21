import React from 'react';
import styles from './Banner.module.css';
import { CircularProgress } from '@mui/material';

export const Banner = ({ banner, additionalStyle, isFetching = false }) => {
	return (
		<div className={`${styles.banner} ${additionalStyle}`}>
			{banner && (
				<img
					src={banner}
					alt='banner'
					onError={event => {
						event.currentTarget.className = styles.brokenImage;
					}}
				/>
			)}
			{isFetching && (
				<div className={`loaderContainer ${styles.loader}`}>
					<CircularProgress color='secondary' />
				</div>
			)}
		</div>
	);
};
