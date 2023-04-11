import React, { useState } from 'react';
import { Menu, MenuItem, SpeedDialIcon } from '@mui/material';
import { ProofIcons } from '../../../../../../assets/static/ProofIcons';
import styles from './IconList.module.css';

export const IconList = ({
	proof,
	setFieldValue,
	error,
	touched,
	saveIcon,
}) => {
	const [icon, setIcon] = useState(
		proof.icon_number >= 0 ? (
			<img
				src={ProofIcons[proof.icon_number].icon}
				alt={ProofIcons[proof.icon_number].id}
			/>
		) : (
			<SpeedDialIcon />
		),
	);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickIcon = icon => {
		setIcon(icon);
		setFieldValue('icon_number', icon.props.alt);
		saveIcon({ ...proof, icon_number: icon.props.alt });
		handleClose();
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.addIcon} onClick={handleClick}>
				{icon}
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
				MenuListProps={{
					style: {
						maxHeight: '400px',
						overflowY: 'scroll',
					},
				}}
			>
				{ProofIcons.map(icon => (
					<MenuItem key={icon.id}>
						<div
							className={styles.menuItem}
							onClick={() =>
								handleClickIcon(<img src={icon.icon} alt={icon.id} />)
							}
						>
							{<img src={icon.icon} alt={icon.id} />}
						</div>
					</MenuItem>
				))}
			</Menu>
			{Boolean(error) && touched && <div className={styles.error}>{error}</div>}
		</div>
	);
};
