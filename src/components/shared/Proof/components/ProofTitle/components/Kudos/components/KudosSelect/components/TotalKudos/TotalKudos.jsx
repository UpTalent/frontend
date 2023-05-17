import React, { useEffect, useState } from 'react';
import styles from '../../KudosSelect.module.css';
import { ReactComponent as KudosCat } from '../../../../../../../../../../../assets/notPressedCat.svg';

export const TotalKudos = ({ balance, totalKudos }) => {
	const [kudosSum, setKudosSum] = useState(0);
	const CountKudos = () => {
		var total = 0;
		if (totalKudos.length !== 0) {
			totalKudos.map(el => (total += el));
		}
		setKudosSum(total);
	};

	// useEffect(() => {
	// 	console.log('I work');
	// 	CountKudos();
	// }, [totalKudos]);

	return (
		<div className={styles.TotalKudos}>
			<div className={styles.currentTotal}>
				<h1>Total:</h1>
				<div className={styles.KudosAmount}>
					<KudosCat />
					{totalKudos}
					{/* {kudosSum} */}
					<p>Kudos</p>
				</div>
			</div>
			<div className={styles.balance}>
				<p>Your balance: </p>
				<div>
					{balance}
					<p>Kudos</p>
				</div>
			</div>
		</div>
	);
};
