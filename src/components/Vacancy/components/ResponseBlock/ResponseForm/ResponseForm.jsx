import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import styles from '../ResponseBlock.module.css';
import { validationSchema } from './validation';
import { FormField } from '../../../../shared/FormField';
import { Button, InputAdornment, TextField } from '@mui/material';
import { ConfirmationMessage } from '../../../../shared/Proof/components/ConfirmationMessage';
import { useSelector } from 'react-redux';
import { getUserEmail } from '../../../../../redux/reducers/authentification';

export const ResponseForm = ({
	setIsOpen,
	handleSubmit,
	withContacts = true,
	isFetching,
	action,
	fieldNames,
}) => {
	const [openSubmit, setOpenSubmit] = useState(false);
	const userEmail = useSelector(getUserEmail);

	const initialValues = { contactInfo: userEmail, message: '' };


	const submitForm = async values => {
		await handleSubmit(values);
		setIsOpen(false);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={() => setOpenSubmit(true)}
			validateOnMount={true}
		>
			{({ isValid, errors, touched, values }) => (
				<Form className={styles.responseForm}>
					{withContacts && (
						<FormField
							label={'Contact info'}
							name={'contactInfo'}
							required={true}
						/>
					)}
					<Field
						label={fieldNames.label}
						name={'message'}
						required={true}
						as={TextField}
						multiline
						minRows={5}
						placeholder={fieldNames.placeholder}
						error={touched.message && Boolean(errors.message)}
						helperText={touched.message && errors.message}
						InputProps={{
							startAdornment: (
								<InputAdornment position='end'>
									<p className={styles.symbolCounter}>
										{values.message?.length}/1000
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
							Confirm
						</Button>
						<ConfirmationMessage
							confirmMessage={openSubmit}
							handleConfim={setOpenSubmit}
							buttonHandler={() => submitForm(values)}
							action={action}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};
