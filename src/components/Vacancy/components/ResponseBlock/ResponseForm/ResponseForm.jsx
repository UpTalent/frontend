import { Field, Form, Formik } from 'formik';
import React from 'react';
import styles from '../ResponseBlock.module.css';
import { useSelector } from 'react-redux';
import { getUserEmail } from '../../../../../redux/reducers/authentification';
import { validationSchema } from './validation';
import { FormField } from '../../../../shared/FormField';
import { Button, InputAdornment, TextField } from '@mui/material';

export const ResponseForm = ({
	setIsOpen,
	handleSubmit,
	withContacts = true,
	isFetching,
}) => {
	const userEmail = useSelector(getUserEmail);

	const submitForm = async values => {
		await handleSubmit(values);
		setIsOpen(false);
	};

	return (
		<Formik
			initialValues={{ contactInfo: userEmail, message: '' }}
			validationSchema={validationSchema}
			onSubmit={submitForm}
			validateOnMount={true}
		>
			{({ isValid, errors, touched, values }) => (
				<Form className={styles.responseForm}>
					{withContacts && (
						<FormField
							label='Contact info'
							name='contactInfo'
							required={true}
						/>
					)}
					<Field
						label='Cover letter'
						name='message'
						required={true}
						as={TextField}
						multiline
						minRows={5}
						placeholder={
							'Introduce yourself and tell us what interests you about this vacancy'
						}
						error={touched.message && Boolean(errors.message)}
						helperText={touched.message && errors.message}
						InputProps={{
							startAdornment: (
								<InputAdornment position='end'>
									<p className={styles.symbolCounter}>
										{values.message.length}/1000
									</p>
								</InputAdornment>
							),
						}}
					/>
					<div className={styles.controllButtons}>
						<Button
							color='warning'
							variant='outlined'
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							variant='contained'
							disabled={!isValid || isFetching}
						>
							Apply
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
