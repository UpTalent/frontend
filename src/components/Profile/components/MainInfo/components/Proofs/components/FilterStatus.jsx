import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Badge } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PostAddIcon from '@mui/icons-material/PostAdd';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const FilterStatus = ({ handleChange, status }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const changeStatus = status => {
		handleChange(status);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Badge badgeContent={status} color='primary'>
				<Button
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					Filter
				</Button>
			</Badge>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={() => changeStatus('DRAFT')}>
					<PostAddIcon />
					Draft
				</MenuItem>
				<MenuItem onClick={() => changeStatus('PUBLISHED')}>
					<VisibilityIcon />
					Published
				</MenuItem>
				<MenuItem onClick={() => changeStatus('HIDDEN')}>
					<VisibilityOffIcon />
					Hidden
				</MenuItem>
			</Menu>
		</div>
	);
};
