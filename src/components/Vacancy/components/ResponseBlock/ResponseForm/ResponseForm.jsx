import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import styles from '../ResponseBlock.module.css';
import { validationSchema } from './validation';
import { FormField } from '../../../../shared/FormField';
import { Button, InputAdornment, TextField } from '@mui/material';
import { ConfirmationMessage } from '../../../../shared/Proof/components/ConfirmationMessage';

export const ResponseForm = ({
	setIsOpen,
	handleSubmit,
	withContacts = true,
	isFetching,
	initialValues,
	action,
	fieldNames,
}) => {
	const [openSubmit, setOpenSubmit] = useState(false);

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
							label={fieldNames[0].label}
							name={fieldNames[0].name}
							required={true}
						/>
					)}
					<Field
						label={fieldNames[1].label}
						name={fieldNames[1].name}
						required={true}
						as={TextField}
						multiline
						minRows={5}
						placeholder={fieldNames[1].placeholder}
						error={touched[fieldNames[1].name] && Boolean(errors[fieldNames[1].name])}
						helperText={touched[fieldNames[1].name] && errors[fieldNames[1].name]}
						InputProps={{
							startAdornment: (
								<InputAdornment position='end'>
									<p className={styles.symbolCounter}>
										{values[fieldNames[1].name]?.length}/1000
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
