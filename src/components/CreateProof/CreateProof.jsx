import React, { useState } from 'react';
import { Alert, CircularProgress, Dialog } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CreateProof.module.css';
import { useNavigate } from 'react-router-dom';
import { ProofForm } from './components/ProofForm';
import { Proof } from '../shared/Proof';
import { useDispatch, useSelector } from 'react-redux';
import { clearProof, getProof, updateProof } from '../../redux/reducers/proof';

export const CreateProof = () => {
	const navigate = useNavigate();

	const [open, setOpen] = useState(true);
	const [value, setValue] = useState(0);
	const [error, setError] = useState(null);

	const proof = useSelector(getProof);
	const dispatch = useDispatch();

	const setProof = values => {
		dispatch(updateProof(values));
	};

	const mode = proof.status ? 'edit' : 'create';

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
		dispatch(clearProof());
	};

	const tabLabels = ['WRITE', 'PREVIEW'];
	const tabContent = [
		<ProofForm
			proof={proof}
			updateTempProof={setProof}
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
				{proof.isFetching ? (
					<div className='loaderContainer'>
						<CircularProgress />
					</div>
				) : (
					<>
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
					</>
				)}
			</Dialog>
		</>
	);
};
