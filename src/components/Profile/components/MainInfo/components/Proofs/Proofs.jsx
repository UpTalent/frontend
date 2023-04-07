import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import styles from './Proofs.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { Proof } from '../../../../../shared/Proof';
import styles from '../../MainInfo.module.css';
import { proofAPI } from '../../../../../../api/proofAPI';
import { LinearProgress } from '@mui/material';

export const Proofs = () => {
	const [proof, setProof] = useState(null);
	// const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);
	const getProof = async () => {
		try {
			const { data } = await proofAPI.getProof(1, 1);
			setProof(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getProof();
	}, []);

	return (
		<div className={styles.proofContainer}>
			{proof ? (
				<>
					{/* <Button onClick={handleOpen}>Open modal</Button>
					<Dialog open={open} onClose={handleClose}>
						<Tabs>
							<Tab label='WRITE' />
							<Tab label='PREVIEW' />
						</Tabs>
						<DialogContent>
							<TextField
								margin='dense'
								id='icon'
								label='Choose an icon'
								type='icon'
							/>

							<TextField
								margin='dense'
								id='icon'
								label='Title of proof'
								type='icon'
							/>

							<TextField
								margin='dense'
								id='icon'
								label='Add some annotation, what your proof is about?'
								type='icon'
								fullWidth
							/>

							<TextField
								margin='dense'
								id='icon'
								label='Content of proof'
								type='icon'
								fullWidth
							/>

							<Button
								type='submit'
								variant='contained'
								className={styles.publishButton}
							>
								Publish
							</Button>

							<Button
								type='submit'
								variant='contained'
								className={styles.saveButton}
							>
								Save changes
							</Button>
						</DialogContent>
						<CloseIcon className={styles.closeIcon} onClick={handleClose} />
					</Dialog> */}
					<Proof proof={proof} withContent={false} showControlls={false} />
					<Proof proof={proof} withContent={true} showControlls={true} />
					<Proof proof={proof} withContent={true} showControlls={false} />
				</>
			) : (
				<LinearProgress />
			)}
		</div>
	);
};
