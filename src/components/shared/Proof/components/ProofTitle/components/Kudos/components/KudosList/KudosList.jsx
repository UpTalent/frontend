import React, { useState } from 'react';
import styles from './KudosList.module.css';
import {
	Dialog,
	DialogContent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { KudosListItem } from '../KudosListItem/KudosListItem';

export const KudosList = ({
	kudosList,
	getKudoList,
	openList,
	setOpenList,
}) => {
	const closeHandler = () => {
		setOpenList(false);
	};

	const [page, setPage] = useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<Dialog
			open={openList}
			onClose={closeHandler}
			aria-labelledby='alert-dialog-title'
			sx={{
				'& .MuiPaper-root': {
					minHeight: '500px',
					borderRadius: '10px',
					width: 'auto'
				},
			}}
		>
			<DialogContent>
				<Table className={styles.tableContainer}>
					<TableHead className={styles.head} sx={{
						'& .MuiTableHead-root': {
							borderRadius: '15px'
						}
					}}>
						<TableRow>
							{Object.keys(kudosList[0]).map(el => (
								<TableCell key={el.sent}>{el.toUpperCase()}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody className={styles.body}>
						{kudosList.length !== 0 &&
							kudosList.map(el => <KudosListItem key={el.sent} {...el} />)}
					</TableBody>
				</Table>
			</DialogContent>
			<CloseIcon className={styles.closeIcon} onClick={closeHandler} />
		</Dialog>
	);
};
