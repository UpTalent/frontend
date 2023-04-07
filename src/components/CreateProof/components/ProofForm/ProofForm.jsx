import {
	Button,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './ProofForm.module.css';
import { Formik, Form } from 'formik';
import { validationSchema } from './validation';
import { FormField } from '../../../shared/FormField';
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
	};

	const changeHandler = value => {
		saveProof({ ...value, icon_number: icon.props.alt });
		console.log('work');
	};

	return (
		<>
			<Formik
				initialValues={proof}
				validationSchema={validationSchema}
				validateOnChange={true}
				validateOnBlur={true}
				validateOnMount={true}
				onChange={changeHandler} // doesn't work
				onSubmit={changeHandler}
			>
				{({ isValid }) => (
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
								onChange={changeHandler}
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
							<FormField
								label='Title of proof'
								name='title'
								type='text'
								className={styles.title}
							/>
						</div>
						<FormField
							label='Add some annotation, what your proof is about?'
							name='summary'
							type='text'
						/>
						<FormField label='Content of proof' name='content' type='text' />
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
