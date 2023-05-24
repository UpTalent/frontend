import { Dialog } from '@mui/material';
import React from 'react';
import styles from './Rank.module.css';

export const RankInfoModal = ({ showInfo, setShowInfo }) => {
	return (
		<Dialog open={showInfo} onClick={() => setShowInfo(false)}>
			<div className={styles.container}>
				<h3>
					On our site we have rank system which is based on talent's total kudos
					count
				</h3>
				<ol>
					<li><b>Trainee:</b> 0 - 10000 kudos</li>
					<li><b>Silver:</b> 10000 - 100000 kudos</li>
					<li><b>Gold:</b> 100000 - 1000000 kudos</li>
					<li><b>Platinum Cat:</b> 1000000+ kudos</li>
				</ol>
			</div>
		</Dialog>
	);
};
