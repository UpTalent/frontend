import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from './FormInsideFormik.module.css';
import { Form, Field, useFormikContext } from 'formik';
import { IconList } from './IconList/IconList';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreDispatch } from '../../../../../redux/store';
import {
	createDraftProof,
	editProof,
	publishDraftProof,
} from '../../../../../redux/reducers/proof';
import { ConfirmationMessage } from '../../../../shared/Proof/components/ConfirmationMessage';

export const FormInsideFormik = ({ proof, saveProof, mode, setError }) => {
	const { isValid, touched, errors, setFieldValue, values } =
		useFormikContext();
	const navigate = useNavigate();
	const dispatch = useStoreDispatch();
	const { talentId } = useParams();
	const [openConfirm, setOpenConfirm] = useState(false);

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	const handleChangesInFields = event => {
		const { name, value } = event.target;
		setFieldValue(name, value);
		saveProof({ ...proof, [name]: value });
	};

	const submitHandler = () => {
		if (mode === 'create') {
			dispatch(
				createDraftProof({ talentId, data: { ...values, status: 'DRAFT' } }),
			);
		} else if (mode === 'edit') {
			const data = {
				talentId,
				draftProof: { ...values },
				proofId: proof.id,
				status: 'DRAFT',
			};
			dispatch(editProof(data));
		}
		navigate(`/profile/talent/${talentId}/proofs?page=1&filter=DRAFT`);
	};

	const publishHandler = () => {
		if (mode === 'edit') {
			const data = {
				talentId,
				draftProof: { ...proof, status: 'PUBLISHED' },
				proofId: proof.id,
				status: 'PUBLISHED',
			};
			dispatch(editProof(data));
			navigate(`/profile/talent/${talentId}/proofs?page=1&filter=PUBLISHED`);
		} else if (mode === 'create') {
			dispatch(
				publishDraftProof({
					talentId,
					draftProof: { ...proof, status: 'DRAFT' },
				}),
			);
			navigate(`/profile/talent/${talentId}/proofs?page=1&filter=PUBLISHED`);
		}
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
				onKeyDown={handleKeyDown}
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
					disabled={!isValid}
					onClick={() => setOpenConfirm(true)}
				>
					Publish
				</Button>
				{openConfirm && (
					<ConfirmationMessage
						action={'PUBLISH'}
						handleConfim={setOpenConfirm}
						confirmMessage={openConfirm}
						buttonHandler={publishHandler}
					/>
				)}
			</div>
		</Form>
	);
};
