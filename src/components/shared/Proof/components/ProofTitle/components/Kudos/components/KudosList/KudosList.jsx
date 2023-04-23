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
import sadcat from '../../../../../../../../../assets/sadcat.png';

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
					maxWidth: '100%',
				},
			}}
		>
			<DialogContent className={styles.dialog}>
				{kudosList.length ? (
					<TableContainer sx={{ maxHeight: 600, margin: '10px' }}>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell align='center'>FIRSTNAME</TableCell>
									<TableCell align='center'>LASTNAME</TableCell>
									<TableCell align='center'>KUDOS</TableCell>
									<TableCell align='center'>DATE/TIME</TableCell>
								</TableRow>
							</TableHead>
							<TableBody className={styles.body}>
								{kudosList.length !== 0 &&
									kudosList.map(el => <KudosListItem key={el.sent} {...el} />)}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<>
						<img src={sadcat} alt='sad cat' style={{ height: '50px' }} />
						<p>Nobody put kudos on your proof</p>
					</>
				)}
			</DialogContent>
			<CloseIcon className={styles.closeIcon} onClick={closeHandler} />
		</Dialog>
	);
};
