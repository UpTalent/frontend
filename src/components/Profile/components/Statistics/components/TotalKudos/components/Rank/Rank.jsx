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
				Rank: {rank}
			</p>
			<RankInfoModal {...{ showInfo, setShowInfo }} />
		</>
	);
};
