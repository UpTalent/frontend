import React, { useState } from 'react';
import { Menu, MenuItem, SpeedDialIcon } from '@mui/material';
import { ProofIcons } from '../../../../../../assets/static/ProofIcons';
import styles from '../FormInsideFormik.module.css';

export const IconList = ({handleActionClick, icon}) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickIcon = icon => {
		handleActionClick(icon);
		handleClose();
	};
	return (
		<div>
			<div
				style={{
					backgroundColor: 'var(--primary)',
					borderRadius: '50%',
				}}
			>
				<SpeedDialIcon
					aria-label='start-icon'
					onClick={handleClick}
					icon={icon}
					className={styles.addIcon}
				/>
			</div>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				PaperProps={{
					style: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				}}
			>
				{ProofIcons.map(icon => (
					<MenuItem key={icon.id}>
						<div
							style={{
								backgroundColor: 'var(--primary)',
								borderRadius: '50%',
								width: '80px',
							}}
							onClick={() =>
								handleClickIcon(<img src={icon.icon} alt={icon.id} />)
							}
						>
							{<img src={icon.icon} alt={icon.id} />}
						</div>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
