import React from 'react';
import styles from './Rank.module.css';
import { talentRank } from '../../../../../../../../assets/static/talentRank';
import { InfoModal } from '../../../../../../../shared/InfoModal/InfoModal';

export const RankInfoModal = () => {
	return (
		<InfoModal withClose={false}>
			<div className={styles.container}>
				<h3>
					On our site we have <b> rank system</b> which is based on talent's
					total kudos count
				</h3>
				<div>
					{talentRank.map((rank, index) => (
						<div className={styles.rankItem} key={index}>
							<div className={styles.rank}>
								<img src={rank.icon} alt={rank.rank} />
								<h3>{rank.rank}</h3>
							</div>
							<b>
								{rank.kudos + 1} - {talentRank[index + 1]?.kudos || 'and more'}{' '}
								Kudos
							</b>
						</div>
					))}
				</div>
			</div>
		</InfoModal>
	);
};
