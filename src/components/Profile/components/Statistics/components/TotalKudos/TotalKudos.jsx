import React from 'react';
import { StatsElement } from '../StatsElement/StatsElement';
import { formatNumber } from '../../../../../../service/hooks/formatNumber';
import styles from '../../Statistics.module.css';
import { talentRank } from '../../../../../../assets/static/talentRank';
import { Rank } from './components/Rank/Rank';
import { Tooltip } from '@mui/material';

export const TotalKudos = ({ kudos }) => {
	let rank = '';
	let rankProgress = 100;
	for (let i = 0; i < talentRank.length; i++) {
		if (kudos < talentRank[i].kudos) {
			rankProgress = Math.floor((kudos * 100) / talentRank[i].kudos);
			rank = talentRank[i - 1]?.rank || 'Trainee';
			break;
		}
		rank = talentRank.at(-1).rank;
	}

	rankProgress = rankProgress > 100 ? '100%' : `${rankProgress}%`;

	return (
		<StatsElement title={'Total kudos count:'}>
			<Rank rank={rank} />
			<Tooltip title={`${kudos} kudos`} arrow>
				<div className={styles.progressBar}>
					<div style={{ width: rankProgress }} className={styles.filling}></div>
					{rankProgress}
				</div>
			</Tooltip>
			{formatNumber(kudos)} Kudos
		</StatsElement>
	);
};
