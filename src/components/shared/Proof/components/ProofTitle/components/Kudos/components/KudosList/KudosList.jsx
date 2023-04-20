import React from 'react';
import styles from './KudosList.module.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const KudosList = ({
	kudosList,
	getKudoList,
	openList,
	setOpenList,
}) => {
	const closeHandler = () => {
		setOpenList(false);
		console.log(openList);
	};

	return (
		<Dialog
			open={openList}
			onClose={closeHandler}
			aria-labelledby='alert-dialog-title'
			// sx={{
			// 	'& .MuiPaper-root': {
			// 		minHeight: '300px',
			// 		borderRadius: '10px',
			// 		justifyContent: 'space-around',
			// 	},
			// }}
		>
			<DialogTitle id='alert-dialog-title'>
				<p>ARE YOU SURE?</p>
			</DialogTitle>
			<DialogContent>
				<div>List of talents that kudosed this proof</div>
			</DialogContent>
			<CloseIcon className={styles.closeIcon} onClick={closeHandler} />
		</Dialog>
	);
};
