import React, { useEffect, useState } from 'react';
import { Alert, Dialog } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CreateProof.module.css';
import { useNavigate } from 'react-router-dom';
import { ProofForm } from './components/ProofForm';
import { Proof } from '../shared/Proof';
// import { useDispatch } from 'react-redux';
// import { updateProof } from '../../redux/reducers/proof';

export const CreateProof = ({ proof }) => {
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(true);
	const [value, setValue] = useState(0);
	const [error, setError] = useState(null);

	const mode = proof.title ? 'edit' : 'create';
	// якщо сюди передаємо не пустий пруф то в редакс записати те що прийшло з пропсів dispatch(updateProof(proof))
	let initialproof = {
		icon_number: proof && proof.icon_number ? proof.icon_number : null,
		title: proof && proof.title ? proof.title : '',
		summary: proof && proof.summary ? proof.summary : '',
		content: proof && proof.content ? proof.content : '',
		status: proof && proof.status ? proof.status : 'DRAFT',
	};

	// if (proof) {
	// 	dispatch(updateProof(initialproof));
	// }
	// тоді це в редаксі не потрібно
	const [proofForForm, setProofForForm] = useState(initialproof);

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const tabLabels = ['WRITE', 'PREVIEW'];
	const tabContent = [
		<ProofForm
			proof={proofForForm}
			saveProof={setProofForForm}
			mode={mode}
			setError={setError}
		/>,
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
				{error && (
					<Alert severity='error' onClose={() => setError(null)}>
						{error}
					</Alert>
				)}
			</Dialog>
		</>
	);
};
