import {
	Button,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './ProofForm.module.css';
import { Formik, Form, Field } from 'formik';
import { validationSchema } from './validation';
import { ProofIcons } from '../../../../assets/static/ProofIcons';

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

	// save values not correct
	const handleChange = event => {
		const { name, value } = event.target;
		saveProof(prevValues => ({ ...prevValues, [name]: value }));
		// console.log(proof);
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
				validateOnMount={true}
				onSubmit={submitHandler}
			>
				{({ isValid, touched, errors, values }) => (
					<Form className={styles.registrationForm}>
						<div className={styles.iconTitle}>
							<SpeedDial
								ariaLabel='Icon'
								name='icon_number'
								sx={{
									position: 'absolute',
								}}
								className={styles.addIcon}
								direction='down'
								icon={icon}
							>
								{ProofIcons.map(el => (
									// need scroll
									<SpeedDialAction
										key={el.id}
										icon={<img src={el.icon} alt={el.id} />}
										onClick={() =>
											handleActionClick(<img src={el.icon} alt={el.id} />)
										}
									/>
								))}
							</SpeedDial>
							<Field
								label='Title of proof'
								name='title'
								as={TextField}
								className={styles.title}
								value={values.title}
								onChange={handleChange}
								error={touched.title && Boolean(errors.title)}
								helperText={touched.title && errors.title}
								sx={{ width: '100%' }}
							/>
						</div>
						<Field
							label='Add some annotation, what your proof is about?'
							name='summary'
							multiline
							rows={4}
							as={TextField}
							value={values.summary}
							//onChange={handleChange}
							error={touched.summary && Boolean(errors.summary)}
							helperText={touched.summary && errors.summary}
							sx={{ width: '100%' }}
						/>
						<Field
							label='Content of proof'
							name='content'
							multiline
							rows={4}
							as={TextField}
							value={values.content}
							//onChange={handleChange}
							error={touched.content && Boolean(errors.content)}
							helperText={touched.content && errors.content}
							sx={{ width: '100%' }}
						/>
						<div className={styles.buttonGroup}>
							<Button
								type='submit'
								variant='contained'
								className={`${isValid && styles.saveButton}`}
								disabled={!isValid}
							>
								SAVE CHANGES
							</Button>
							<Button
								variant='contained'
								className={`${isValid && styles.publishButton}`}
								disabled={!isValid}
							>
								Publish
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};
