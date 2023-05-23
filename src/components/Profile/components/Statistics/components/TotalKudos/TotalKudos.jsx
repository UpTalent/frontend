import React from 'react';
import { StatsElement } from '../StatsElement/StatsElement';
import { formatNumber } from '../../../../../../service/hooks/formatNumber';
import styles from '../../Statistics.module.css';
import { talentRank } from '../../../../../../assets/static/talentRank';

export const TotalKudos = ({ kudos }) => {
	let rank = '';
	let rankProgress = 100;
	for (let i = 0; i < talentRank.length; i++) {
		if (kudos < talentRank[i].kudos) {
			rankProgress = Math.floor((kudos * 100) / talentRank[i].kudos);
			rank = talentRank[i - 1]?.rank || 'Trainee';
			return;
		}
		rank = talentRank.at(-1).rank;
	}

	console.log(rankProgress);
	rankProgress = rankProgress > 100 ? '100%' : `${rankProgress}%`;
	return (
		<StatsElement title={'Total kudos count:'}>
			<p>Rank: {rank}</p>
			<div className={styles.progressBar}>
				<div style={{ width: rankProgress }}>{rankProgress}</div>
			</div>
			{formatNumber(kudos)} Kudos
		</StatsElement>
	);
};
