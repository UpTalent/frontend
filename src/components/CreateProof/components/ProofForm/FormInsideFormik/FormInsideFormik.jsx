import { Button, TextField } from '@mui/material';
import React from 'react';
import styles from './FormInsideFormik.module.css';
import { Form, Field, useFormikContext } from 'formik';
import { IconList } from './IconList/IconList';
import { proofAPI } from '../../../../../api/proofAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../../redux/reducers/systemMessages';
import { getTalentsProofs } from '../../../../../redux/reducers/talentsProof';
import { useStoreDispatch } from '../../../../../redux/store';
import { clearProof } from '../../../../../redux/reducers/proof';

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
		saveProof({ ...proof, [name]: value });
	};

	const modifyProof = async (data, proofStatus) => {
		const action = proofStatus !== 'DRAFT' ? 'published' : 'edited';
		try {
			const { id } = data;
			data = { ...data, status: proofStatus };
			await proofAPI.editProof(talentId, id, data);
			dispatch(setSystemMessage(true, `Proof was successfully ${action}`));
			dispatch(clearProof());
		} catch (err) {
			setError(err.message);
		}
	};

	const createProof = async data => {
		try {
			await proofAPI.createProof(talentId, data);
			dispatch(setSystemMessage(true, 'Proof was successfully created'));
			dispatch(clearProof());
			updateList('DRAFT');
			navigate(-1);
		} catch (err) {
			setError(err.message);
		}
	};

	const updateList = status => {
		const data = { talentId, status };
		dispatchASYNC(getTalentsProofs(data));
	};

	const submitHandler = () => {
		if (mode === 'create') {
			createProof({ ...values, status: 'DRAFT' });
		} else if (mode === 'edit') {
			modifyProof({ ...values }, 'DRAFT');
			updateList('DRAFT');
			navigate(-1);
		}
	};

	const publishHandler = () => {
		modifyProof({ ...values }, 'PUBLISHED');
		updateList('PUBLISHED');
		navigate(-1);
	};

	return (
		<Form className={styles.registrationForm}>
			<div className={styles.iconTitle}>
				<IconList
					proof={proof}
					setFieldValue={setFieldValue}
					saveIcon={saveProof}
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
					variant='contained'
					className={`${isValid && styles.saveButton}`}
					disabled={!isValid}
					onClick={submitHandler}
				>
					{mode === 'create' ? 'SAVE AS DRAFT' : 'SAVE CHANGES'}
				</Button>
				<Button
					variant='contained'
					className={`${isValid && styles.publishButton}`}
					disabled={true}
					onClick={publishHandler}
				>
					Publish
				</Button>
			</div>
		</Form>
	);
};
