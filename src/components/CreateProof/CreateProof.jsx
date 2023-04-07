import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CreateProof.module.css';
import { useNavigate } from 'react-router-dom';
import { Form } from './components/Form';
import { Proof } from '../shared/Proof';

export const CreateProof = ({proof}) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(true);
	const [value, setValue] = useState(0);
	
	// продумати логіку то, коли пруф не передається(створення пруфу, а не редагування)
	const previewProof = proof;

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const tabLabels = ['WRITE', 'PREVIEW'];
	const tabContent = [
		<Form />,
		<Proof proof={previewProof} withContent={true} showControlls={true} />,
	];

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<Tabs value={value} onChange={handleChange}>
					{tabLabels.map((label, index) => (
						<Tab key={index} label={label} />
					))}
				</Tabs>
				{tabContent[value]}
				<CloseIcon className={styles.closeIcon} onClick={handleClose} />
			</Dialog>
		</>
	);
};
