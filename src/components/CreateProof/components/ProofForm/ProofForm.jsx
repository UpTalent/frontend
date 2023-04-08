import { SpeedDialIcon } from '@mui/material';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { validationSchema } from './validation';
import { ProofIcons } from '../../../../assets/static/ProofIcons';
import { FormInsideFormik } from './FormInsideFormik/FormInsideFormik';

export const ProofForm = ({ proof, saveProof }) => {
	const [icon, setIcon] = useState(
		proof.icon_number ? (
			<img
				src={ProofIcons[proof.icon_number].icon}
				alt={ProofIcons[proof.icon_number].id}
			/>
		) : (
			<SpeedDialIcon />
		),
	);

	const handleActionClick = icon => {
		setIcon(icon);
		saveProof(prev => ({ ...prev, icon_number: icon.props.alt }));
	};

	const submitHandler = values => {
		saveProof({ ...values, icon_number: icon.props.alt });
	};

	return (
		<>
			<Formik
				initialValues={proof}
				validationSchema={validationSchema}
				validateOnChange={true}
				validateOnBlur={true}
				onSubmit={submitHandler}
			>
				<FormInsideFormik
					icon={icon}
					handleActionClick={handleActionClick}
					saveProof={saveProof}
				/>
			</Formik>
		</>
	);
};
