import { Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './FormInsideFormik.module.css';
import { Form, Field, useFormikContext } from 'formik';
import { IconList } from './IconList/IconList';
import { proofAPI } from '../../../../../api/proofAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../../redux/reducers/systemMessages';
import { getTalentsProofs } from '../../../../../redux/reducers/talentsProof';
import { useStoreDispatch } from '../../../../../redux/store';

export const FormInsideFormik = ({ proof, saveProof, mode, setError }) => {
	const { isValid, touched, errors, setFieldValue, values } =
		useFormikContext();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { talentId } = useParams();
	const dispatchASYNC = useStoreDispatch();

	const handleChangesInFields = event => {
		const { name, value } = event.target;
		setFieldValue(name, value);
	};

	const createProof = async data => {
		try {
			await proofAPI.createProof(talentId, data);
			dispatch(setSystemMessage(true, 'Proof was successfully created'));
		} catch (err) {
			setError(err.message);
			console.log(err.message);
		}
	};

	//  я не знаю чи це працює
	const editProof = async ({ data, id }) => {
		try {
			await proofAPI.editProof(talentId, id, data);
			dispatch(setSystemMessage(true, 'Proof was successfully edited'));
		} catch (err) {
			setError(err.message);
		}
	};

	const updateList = status => {
		const data = { talentId, status };
		dispatchASYNC(getTalentsProofs(data));
	};

	const submitHandler = () => {
		saveProof({ ...values });
		if (mode === 'create') {
			createProof({ ...proof, status: 'DRAFT' });
		} else if (mode === 'edit') {
			//editProof();
		}
		updateList('DRAFT');
		navigate(-1);
	};

	const publishHandler = () => {
		saveProof({ ...values });
		if (mode === 'edit') {
			//editProof();
		} else if (mode === 'create') {
			console.log(proof);
			createProof({ ...proof, status: 'PUBLISHED' });
		}
		updateList('PUBLISHED');
		navigate(-1);
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
					onClick={() => submitHandler()}
				>
					{mode === 'create' ? 'SAVE AS DRAFT' : 'SAVE CHANGES'}
				</Button>
				<Button
					variant='contained'
					className={`${isValid && styles.publishButton}`}
					disabled={!isValid}
					onClick={() => publishHandler()}
				>
					Publish
				</Button>
			</div>
		</Form>
	);
};
