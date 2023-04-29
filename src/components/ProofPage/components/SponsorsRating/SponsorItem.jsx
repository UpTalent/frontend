import React from 'react';
import { TalentAvatar } from '../../../shared/TalentAvatar/TalentAvatar';
import styles from '../../ProofPage.module.css';

export const SponsorItem = ({ fullname, avatar, total_sum_kudos, style }) => {
	return (
		<div className={styles.item} style={style}>
			<TalentAvatar photo={avatar} />
			<div className={styles.text}>
				<b className={styles.sponsorName}>{fullname}</b>
				<p>{total_sum_kudos} KUDOS</p>
			</div>
		</div>
	);
};
