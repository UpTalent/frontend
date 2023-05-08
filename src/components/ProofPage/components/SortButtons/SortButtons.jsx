import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { useSearchParams } from 'react-router-dom';

export const SortButtons = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const value = searchParams.get('sort') || 'desc';

	const [alignment, setAlignment] = useState(value);
	const controlls =
		alignment === 'desc'
			? {
					title: 'from newest to oldest',
					change: 'asc',
					buttonIcon: <MoveDownIcon />,
			  }
			: {
					title: 'from oldest to newest',
					change: 'desc',
					buttonIcon: <MoveUpIcon />,
			  };

	const handleAlignment = () => {
		const newAlignment = controlls.change;
		setAlignment(newAlignment);
		setSearchParams({
			...Object.fromEntries([...searchParams]),
			page: '1',
			sort: newAlignment,
		});
	};

	return (
		<Tooltip title={controlls.title} arrow>
			<Button
				onClick={handleAlignment}
				value={alignment}
				sx={{ borderRadius: '4px', gap: '5px', mt: '15px' }}
				variant='contained'
			>
				Sort by date
				{controlls.buttonIcon}
			</Button>
		</Tooltip>
	);
};
