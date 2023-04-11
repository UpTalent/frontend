import { Tooltip, IconButton } from '@mui/material';
import React from 'react';
import { statuses } from '../../../../../../../../assets/static/status';

export const ControllButton = ({ status, handleClick }) => {
	const controllVariant = statuses.find(el => el.status === status);

	return (
		<>
			<Tooltip title={controllVariant?.title} onClick={handleClick}>
				<IconButton>{controllVariant?.icon}</IconButton>
			</Tooltip>
		</>
	);
};
