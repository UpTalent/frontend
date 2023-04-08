import { Button, TextField } from '@mui/material';
import React, { useEffect} from 'react';
import styles from './FormInsideFormik.module.css';
import { Form, Field, useFormikContext } from 'formik';
import { IconList } from './IconList/IconList';

export const FormInsideFormik = ({ icon, handleActionClick, saveProof }) => {
	const { isValid, touched, errors, setFieldValue, values } =
		useFormikContext();

	useEffect(() => {
		return saveProof({ ...values, icon_number: icon.props.alt });
	}, [values]);

	return (
		<Form className={styles.registrationForm}>
			<div className={styles.iconTitle}>
				<IconList handleActionClick={handleActionClick} icon={icon} />
				<Field
					label='Title of proof'
					name='title'
					as={TextField}
					className={styles.title}
					error={touched.title && Boolean(errors.title)}
					helperText={touched.title && errors.title}
					sx={{ width: '78%' }}
					onChange={e => {
						setFieldValue('title', e.target.value);
						console.log(values);
					}}
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
				sx={{ width: '100%' }}
				onChange={e => {
					setFieldValue('summary', e.target.value);
					console.log(values);
				}}
			/>
			<Field
				label='Content of proof'
				name='content'
				multiline
				rows={4}
				as={TextField}
				error={touched.content && Boolean(errors.content)}
				helperText={touched.content && errors.content}
				sx={{ width: '100%' }}
				onChange={e => {
					setFieldValue('content', e.target.value);
					console.log(values);
				}}
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
	);
};
