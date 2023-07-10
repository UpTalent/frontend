import React from 'react';
import { RankInfoModal } from './RankInfoModal';

export const Rank = ({ rank }) => {
	return (
		<>
			<p>
				<RankInfoModal />
				Rank: {rank.rank}
			</p>
			<img
				src={rank.icon}
				alt={rank.rank}
				style={{ width: '100px', height: '100px' }}
			/>
		</>
	);
};
