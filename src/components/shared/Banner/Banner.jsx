import React from 'react';
import styles from './Banner.module.css';

export const Banner = ({ banner, additionalStyle }) => {
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
		</div>
	);
};
