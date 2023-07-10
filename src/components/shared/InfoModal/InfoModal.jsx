import { CloseOutlined, InfoOutlined } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import React, { useState } from 'react';

export const InfoModal = ({ withClose = true, children }) => {
	const [showInfo, setShowInfo] = useState(false);
	const onClose = () => setShowInfo(false);
	return (
		<>
			<IconButton onClick={() => setShowInfo(true)}>
				<InfoOutlined fontSize='small' />
			</IconButton>
			<Dialog open={showInfo} onClose={onClose}>
				{withClose && (
					<IconButton onClick={onClose} sx={{ alignSelf: 'end' }}>
						<CloseOutlined />
					</IconButton>
				)}
				{children}
			</Dialog>
		</>
	);
};
