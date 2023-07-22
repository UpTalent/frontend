import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';
import styles from './ConfirmationMessage.module.css';
import { Actions } from '../../../../../assets/static/Actions';

export const ConfirmationMessage = ({
	action,
	confirmMessage,
	handleConfim,
	buttonHandler,
}) => {
	const itemAction = Actions.find(item => item.action === action);
	const color = itemAction?.action === 'DELETE' ? 'secondary' : 'primary';

	const closeConfirm = () => {
		handleConfim(false);
	};

	return (
		<>
			<Dialog
				open={confirmMessage}
				onClose={closeConfirm}
				aria-labelledby='alert-dialog-title'
				sx={{
					'& .MuiPaper-root': {
						minHeight: '300px',
						borderRadius: '10px',
						justifyContent: 'space-around',
					},
				}}
			>
				<DialogTitle id='alert-dialog-title' className={styles.title}>
					{itemAction?.icon}
					<p>ARE YOU SURE?</p>
					{itemAction?.text}
				</DialogTitle>
				<DialogActions className={styles.controlls}>
					<Button variant='contained' onClick={closeConfirm} color='inherit'>
						Cancel
					</Button>
					<Button variant='contained' color={color} onClick={buttonHandler}>
						{itemAction?.action.toLowerCase()}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
