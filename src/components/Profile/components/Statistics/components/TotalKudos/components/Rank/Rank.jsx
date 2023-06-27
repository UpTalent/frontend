import { InfoOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { RankInfoModal } from './RankInfoModal';

export const Rank = ({ rank }) => {
	const [showInfo, setShowInfo] = useState(false);
	return (
		<>
			<p>
				<IconButton onClick={() => setShowInfo(true)}>
					<InfoOutlined fontSize='small' />
				</IconButton>
				Rank: {rank.rank}
			</p>
			<RankInfoModal {...{ showInfo, setShowInfo }} />
			<img
				src={rank.icon}
				alt={rank.rank}
				style={{ width: '100px', height: '100px' }}
			/>
		</>
	);
};
