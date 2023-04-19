import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { useSearchParams } from 'react-router-dom';

export const SortButtons = ({ getProofs }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const value = searchParams.get('sort') || 'desc';

	const [alignment, setAlignment] = useState(value);

	const handleAlignment = (event, newAlignment) => {
		setAlignment(newAlignment);
		getProofs(0, newAlignment);
		setSearchParams({ page: '1', sort: newAlignment });
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
