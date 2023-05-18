import React from 'react';
import styles from '../../KudosSelect.module.css';
import { ReactComponent as KudosCat } from '../../../../../../../../../../../assets/notPressedCat.svg';

export const TotalKudos = ({ balance, totalKudos }) => {
	return (
		<div className={styles.TotalKudos}>
			<div className={styles.currentTotal}>
				<h1>Total:</h1>
				<div className={styles.KudosAmount}>
					<KudosCat />
					{totalKudos}
					<p>Kudos</p>
				</div>
			</div>
			<div className={styles.balance}>
				<p>Your balance: </p>
				<div className={styles.balanceAmount}>
					<KudosCat />
					<b>{balance}</b>
					<p>Kudos</p>
				</div>
			</div>
		</div>
	);
};
