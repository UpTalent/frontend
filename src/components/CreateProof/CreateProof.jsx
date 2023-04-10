import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CreateProof.module.css';
import { useNavigate } from 'react-router-dom';
import { ProofForm } from './components/ProofForm';
import { Proof } from '../shared/Proof';

export const CreateProof = ({ proof }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(true);
	const [value, setValue] = useState(0);

	const mode = proof ? 'edit' : 'create';

	let initialproof = {
		icon_number:
			proof && proof.icon_number !== undefined ? proof.icon_number : null,
		title: proof && proof.title !== undefined ? proof.title : '',
		summary: proof && proof.summary !== undefined ? proof.summary : '',
		content: proof && proof.content !== undefined ? proof.content : '',
	};

	const [proofForForm, setProofForForm] = useState(initialproof);

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const tabLabels = ['WRITE', 'PREVIEW'];
	const tabContent = [
		<ProofForm proof={proofForForm} saveProof={setProofForForm} mode={mode} />,
		<Proof proof={proofForForm} withContent={true} showControlls={false} />,
	];

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				scroll='paper'
				sx={{ '& .MuiDialog-paper': { padding: '20px' } }}
			>
				<Tabs
					value={value}
					onChange={(event, newValue) => setValue(newValue)}
					centered
					textColor='secondary'
					indicatorColor='secondary'
				>
					{tabLabels.map((label, index) => (
						<Tab key={index} label={label} color='secondary' />
					))}
				</Tabs>
				<div className={styles.tabContent}>{tabContent[value]}</div>
				<CloseIcon className={styles.closeIcon} onClick={handleClose} />
			</Dialog>
		</>
	);
};
