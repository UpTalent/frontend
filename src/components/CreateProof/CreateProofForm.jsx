import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CreateProofForm.module.css';
import { useNavigate } from 'react-router-dom';

export const CreateProofForm = () => {
    const navigate = useNavigate();
	const [open, setOpen] = useState(true);
	//const [error, setError] = useState(null);

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
    };
    
    
	return (
		<>
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
			</Dialog>
		</>
	);
};
