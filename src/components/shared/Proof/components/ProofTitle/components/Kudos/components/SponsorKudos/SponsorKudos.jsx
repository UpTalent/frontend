import React from 'react';
import { formatNumber } from '../../../../../../../../../service/hooks/formatNumber';
import styles from '../../Kudo.module.css';

export const SponsorKudos = ({ sum_kudos_from_me, isActive, isPres }) => {
	return (
		<div className={` ${styles.sponsor} ${isActive && styles.animation} ${
            isPres && !isActive ? styles.pressedKudos : styles.sponsorKudos
        }`}>{formatNumber(sum_kudos_from_me)}</div>
	);
};
