import React, { useEffect, useState } from 'react';
import { Alert, Dialog } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CreateProof.module.css';
import { useNavigate } from 'react-router-dom';
import { ProofForm } from './components/ProofForm';
import { Proof } from '../shared/Proof';
import { useDispatch, useSelector } from 'react-redux';
import { updateProof, getProof } from '../../redux/reducers/proof';

export const CreateProof = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(true);
	const [value, setValue] = useState(0);
	const [error, setError] = useState(null);

	const proof= useSelector(getProof);

	const saveProof = (values) => {
		dispatch(updateProof(values))
	}
	
	const mode = proof.status ? 'edit' : 'create';

	console.log(mode);

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const tabLabels = ['WRITE', 'PREVIEW'];
	const tabContent = [
		<ProofForm
			proof={proof}
			saveProof={saveProof}
			mode={mode}
			setError={setError}
		/>,
		<Proof proof={proof} withContent={true} showControlls={false} />,
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
