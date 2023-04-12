import React from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import MoveDownIcon from '@mui/icons-material/MoveDown';

export const SortButtons = ({
	alignment,
	setAlignment,
	setSearchParams,
	urlPage,
	getProofs,
}) => {
	const handleAlignment = (event, newAlignment) => {
		setAlignment(newAlignment);
		if (urlPage === 1) {
			getProofs(0, newAlignment);
		} else {
			setSearchParams({ page: '1' });
		}
	};
	return (
		<ToggleButtonGroup
			value={alignment}
			exclusive
			onChange={handleAlignment}
			aria-label='sort by date'
			sx={{ mt: '15px' }}
		>
			<ToggleButton value='desc' aria-label='sort by desc'>
				<Tooltip title='from newest to oldest'>
					<MoveUpIcon />
				</Tooltip>
			</ToggleButton>

			<ToggleButton value='asc' aria-label='sort by asc'>
				<Tooltip title='from oldest to newest'>
					<MoveDownIcon />
				</Tooltip>
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
