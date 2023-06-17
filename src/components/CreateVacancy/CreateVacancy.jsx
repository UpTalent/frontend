import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../CreateProof/components/ProofForm/FormInsideFormik/FormInsideFormik.module.css';
import {
	Button,
	Dialog,
	InputAdornment,
	TextField,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { FormField } from '../shared/FormField';
import { Markdown } from '../shared/FormField/components/Markdown/Markdown';
import { FieldForSkills } from '../shared/FieldForSkills/FieldForSkills';
import { useSelector } from 'react-redux';
import { getAllSkills, getSkills } from '../../redux/reducers/skills';
import { useStoreDispatch } from '../../redux/store';
import { validationSchema } from './validation';
import { prepareProof } from '../../redux/reducers/proof';
import { setSystemMessage } from '../../redux/reducers/systemMessages';
import { vacancyAPI } from '../../api/vacancyAPI';
import { ConfirmationMessage } from '../shared/Proof/components/ConfirmationMessage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const CreateVacancy = () => {
	const { mode, vacancy } = useOutletContext();
	const [open, setOpen] = useState(true);
	const [openConfirm, setOpenConfirm] = useState(false);
	const navigate = useNavigate();
	const skills = useSelector(getAllSkills);
	const dispatch = useStoreDispatch();

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const submitHandler = async values => {
		values = prepareProof(values);
		const action = mode === 'create' ? 'created' : 'edited';
		try {
			if (mode === 'create') {
				await vacancyAPI.createVacancy({ ...values, status: 'DRAFT' });
			} else {
				await vacancyAPI.editVacancy(values.id, values);
			}
			dispatch(setSystemMessage(true, `Vacancy was successfully ${action}`));
			navigate(-1);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};

	const publishHandler = async values => {
		try {
			values = prepareProof(values);
			if (mode === 'create') {
				await vacancyAPI.createVacancy({ ...values, status: 'PUBLISHED' });
			} else {
				await vacancyAPI.editVacancy(values.id, {
					...values,
					status: 'PUBLISHED',
				});
			}
			dispatch(setSystemMessage(true, 'Vacancy was successfully published'));
			navigate(-1);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};

	useEffect(() => {
		if (!skills.length) {
			dispatch(getSkills());
		}
	}, [skills.length]);

	return (
		<>
			<Dialog open={open} onClose={handleClose} fullWidth>
				<Formik
					initialValues={vacancy}
					validationSchema={validationSchema}
					validateOnMount={true}
				>
					{({ isValid, values, touched, errors, setFieldValue }) => (
						<Form className={styles.registrationForm}>
							<h1 className={styles.formTitle}>
								{mode === 'create' ? 'Create new vacancy' : 'Edit vacancy'}
								<AutoAwesomeIcon color='secondary' fontSize='large' />
							</h1>
							<FormField
								label='Title'
								name='title'
								type='text'
								required={true}
							/>
							<Field
								label='Content of vacancy'
								name='content'
								required={true}
								multiline
								fullWidth
								rows={8}
								as={TextField}
								error={touched.content && Boolean(errors.content)}
								helperText={touched.content && errors.content}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<Markdown />
										</InputAdornment>
									),
								}}
							/>
							<FieldForSkills {...{ values, setFieldValue, errors }} />
							<div className={styles.buttonGroup}>
								<Button
									variant='contained'
									className={`${isValid && styles.saveButton}`}
									disabled={!isValid}
									onClick={() => submitHandler(values)}
								>
									{mode === 'create' ? 'SAVE AS DRAFT' : 'SAVE CHANGES'}
								</Button>
								<Button
									variant='contained'
									className={`${
										isValid && values.skills.length && styles.publishButton
									}`}
									disabled={!isValid || values.skills.length === 0}
									onClick={() => setOpenConfirm(true)}
								>
									Publish
								</Button>
							</div>
							{openConfirm && (
								<ConfirmationMessage
									action={'PUBLISH'}
									handleConfim={setOpenConfirm}
									confirmMessage={openConfirm}
									buttonHandler={() => publishHandler(values)}
								/>
							)}
						</Form>
					)}
				</Formik>
				<CloseIcon className={styles.closeIcon} onClick={handleClose} />
			</Dialog>
		</>
	);
};
