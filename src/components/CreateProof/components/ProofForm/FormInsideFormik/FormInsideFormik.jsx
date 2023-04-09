import { Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './FormInsideFormik.module.css';
import { Form, Field, useFormikContext } from 'formik';
import { IconList } from './IconList/IconList';

export const FormInsideFormik = ({ proof, saveProof, mode }) => {
	const { isValid, touched, errors, setFieldValue, values } =
		useFormikContext();

	const handleChangesInFields = event => {
		const { name, value } = event.target;
		setFieldValue(name, value);
	};

	useEffect(() => {
		return () => {
			saveProof({ ...values });
		};
	}, [values]);

	return (
		<Form className={styles.registrationForm}>
			<div className={styles.iconTitle}>
				<IconList
					proof={proof}
					setFieldValue={setFieldValue}
					error={errors.icon_number}
					touched={touched.icon_number}
				/>
				<Field
					label='Title of proof'
					name='title'
					as={TextField}
					className={styles.title}
					error={touched.title && Boolean(errors.title)}
					helperText={touched.title && errors.title}
					onChange={handleChangesInFields}
				/>
			</div>

			<Field
				label='Add some annotation, what your proof is about?'
				name='summary'
				multiline
				rows={4}
				as={TextField}
				error={touched.summary && Boolean(errors.summary)}
				helperText={touched.summary && errors.summary}
				onChange={handleChangesInFields}
			/>
			<Field
				label='Content of proof'
				name='content'
				multiline
				rows={4}
				as={TextField}
				error={touched.content && Boolean(errors.content)}
				helperText={touched.content && errors.content}
				onChange={handleChangesInFields}
			/>
			<div className={styles.buttonGroup}>
				<Button
					type='submit'
					variant='contained'
					className={`${isValid && styles.saveButton}`}
					disabled={!isValid}
				>
					{mode === 'create' ? 'SAVE AS DRAFT' : 'SAVE CHANGES'}
				</Button>
				{mode === 'edit' && (
					<Button
						variant='contained'
						className={`${isValid && styles.publishButton}`}
						disabled={!isValid}
					>
						Publish
					</Button>
				)}
			</div>
		</Form>
	);
};
