import React from 'react';
import styles from './TalentAvatar.module.css';
import defaultIcon from '../../../assets/defaultTalent.png';

export const TalentAvatar = ({ photo, additionalStyle }) => {
	return (
		<img
			src={photo || defaultIcon}
			alt='icon'
			className={`${styles.TalentAvatar} ${additionalStyle}`}
			onError={event => {
				event.target.src = defaultIcon;
			}}
		/>
	);
};
