import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useState } from 'react';
import { SponsorControlls } from './SponsorControlls';

export const ManagingResponse = ({ ableToDelete, userRole }) => {
	const [openConfirm, setOpenConfirm] = useState(false);
	return (
		<div>
			{ableToDelete ? (
				<Tooltip
					title='Delete Response'
					onClick={() => {
						setOpenConfirm(true);
					}}
				>
					<IconButton>
						<DeleteIcon color='action' />
					</IconButton>
				</Tooltip>
			) : userRole === 'sponsor' ? (
				<SponsorControlls />
			) : null}
		</div>
	);
};
