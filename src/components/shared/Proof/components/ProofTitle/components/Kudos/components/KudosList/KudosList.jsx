import React from 'react';
import styles from './KudosList.module.css';
import {
	Dialog,
	DialogContent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { KudosListItem } from '../KudosListItem/KudosListItem';

export const KudosList = ({ kudosList, openList, setOpenList }) => {
	const closeHandler = () => {
		setOpenList(false);
	};

	return (
		<Dialog
			open={openList}
			onClose={closeHandler}
			aria-labelledby='alert-dialog-title'
			sx={{
				'& .MuiPaper-root': {
					borderRadius: '10px',
					minWidth: '600px',
				},
			}}
		>
			<DialogContent className={styles.dialog}>
				{kudosList.length ? (
					<TableContainer sx={{ maxHeight: 600 }}>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									{Object.keys(kudosList[0]).map(el => (
										<TableCell align='center' key={el.sent}>
											{el.toUpperCase()}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody className={styles.body}>
								{kudosList.length !== 0 &&
									kudosList.map(el => <KudosListItem key={el.sent} {...el} />)}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<p className={styles.NonKudo}>No one put kudos on your proof</p>
				)}
			</DialogContent>
			<CloseIcon className={styles.closeIcon} onClick={closeHandler} />
		</Dialog>
	);
};