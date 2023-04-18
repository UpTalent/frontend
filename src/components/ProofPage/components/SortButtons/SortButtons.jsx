import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import MoveDownIcon from '@mui/icons-material/MoveDown';

export const SortButtons = ({
	urlPage,
	setSearchParams,
	getProofs,
	alignment,
	setAlignment
}) => {
	//const [alignment, setAlignment] = useState(value);

	//...Object.fromEntries([...searchParams]),
	const handleAlignment = (event, newAlignment) => {
		setAlignment(newAlignment);
		getProofs(0, newAlignment);
		console.log('i work 2');
		setSearchParams({ page: '1', sort: newAlignment });
		// setAlignment(newAlignment);
		// if (urlPage === 1) {
		// 	getProofs(0, newAlignment);
		// 	setSearchParams({ ...Object.fromEntries([...searchParams])});
		// } else {
		// 	setSearchParams({ page: '1' , sort: alignment});
		// }
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
