import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './FormInsideFormik.module.css';
import { Form, Field, useFormikContext } from 'formik';
import { IconList } from './IconList/IconList';
import { proofAPI } from '../../../../../api/proofAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../../redux/reducers/systemMessages';

export const FormInsideFormik = ({ proof, saveProof, mode, setError }) => {
	const { isValid, touched, errors, setFieldValue, values } =
		useFormikContext();
	const { talentId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChangesInFields = event => {
		const { name, value } = event.target;
		setFieldValue(name, value);
		console.log(values);
	};

	const createProof = async data => {
		try {
			await proofAPI.createProof(talentId, data);
			dispatch(setSystemMessage(true, 'Proof was successfully created'));
			navigate(-1);
		} catch (err) {
			setError(err.message);			
		}
	};
	//  я не чи це працює
	const editProof = async ({data, id}) => {
		try {
			await proofAPI.editProof(talentId, id, data);
			dispatch(setSystemMessage(true, 'Proof was successfully edited'));
			navigate(-1);
		} catch (err) {
			setError(err.message);
		}
	};

	const submitHandler = () => {
		saveProof({ ...values });
		if (mode === 'create') {
			createProof({ ...proof })
			// можливо треба очищати стейт після створення пруфу
		} else {
			//editProof();
		}
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
					onClick={()=>submitHandler()}
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
