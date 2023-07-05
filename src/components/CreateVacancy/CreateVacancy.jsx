import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../CreateProof/components/ProofForm/FormInsideFormik/FormInsideFormik.module.css';
import {
	Button,
	Dialog,
	InputAdornment,
	InputLabel,
	Slider,
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
import { prepareItem } from '../../redux/reducers/proof';
import { setSystemMessage } from '../../redux/reducers/systemMessages';
import { vacancyAPI } from '../../api/vacancyAPI';
import { ConfirmationMessage } from '../shared/Proof/components/ConfirmationMessage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getItemsList } from '../../redux/reducers/userItems';
import { PUBLISH } from '../../service/constants';
import { MatchedSkillsInfo } from './components/MatchedSkillsInfo/MatchedSkillsInfo';

export const CreateVacancy = () => {
	const { mode, vacancy, setVacancy, vacancyFull } = useOutletContext();
	const navigate = useNavigate();
	const { sponsorId } = useParams();

	const [open, setOpen] = useState(true);
	const [openConfirm, setOpenConfirm] = useState(false);

	const skills = useSelector(getAllSkills);
	const dispatch = useStoreDispatch();

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const submitHandler = async values => {
		const newValues = prepareItem(values);
		const action = mode === 'create' ? 'created' : 'edited';
		try {
			if (mode === 'create') {
				await vacancyAPI.createVacancy({ ...newValues, status: 'DRAFT' });
			} else {
				await vacancyAPI.editVacancy(values.id, newValues);
			}
			dispatch(setSystemMessage(true, `Vacancy was successfully ${action}`));
			dispatch(
				getItemsList({ id: sponsorId, status: 'DRAFT', item: 'vacancies' }),
			);
			if (vacancyFull) {
				setVacancy(values);
				navigate(-1);
			} else {
				navigate(`/profile/sponsor/${sponsorId}/vacancies?page=1&filter=DRAFT`);
			}
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};

	const publishHandler = async values => {
		try {
			const newValues = prepareItem(values);
			if (mode === 'create') {
				await vacancyAPI.createVacancy({ ...newValues, status: 'PUBLISHED' });
			} else {
				await vacancyAPI.editVacancy(values.id, {
					...newValues,
					status: 'PUBLISHED',
				});
			}
			dispatch(setSystemMessage(true, 'Vacancy was successfully published'));
			dispatch(
				getItemsList({ id: sponsorId, status: 'PUBLISHED', item: 'vacancies' }),
			);
			if (vacancyFull) {
				setVacancy({ ...values, status: 'PUBLISHED', published: Date.now() });
				navigate(-1);
			} else {
				navigate(
					`/profile/sponsor/${sponsorId}/vacancies?page=1&filter=PUBLISHED`,
				);
			}
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
					{({
						isValid,
						values,
						touched,
						errors,
						setFieldValue,
						setFieldTouched,
					}) => (
						<Form className={styles.registrationForm}>
							<h1 className={styles.formTitle}>
								{mode === 'create' ? 'Create new vacancy' : 'Edit vacancy'}
								<AutoAwesomeIcon color='secondary' fontSize='large' />
							</h1>
							<FormField label='Title' name='title' type='text' required />
							<Field
								label='Content of vacancy'
								name='content'
								multiline
								fullWidth
								rows={8}
								as={TextField}
								required
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
							<FieldForSkills
								{...{
									values,
									setFieldValue,
									setFieldTouched,
									errors,
									touched,
									required: true,
								}}
							/>
							{values.skills.length !== 0 && (
								<>
									<InputLabel
										id='input-slider'
										sx={{ alignSelf: 'flex-start', fontSize: '0.75rem' }}
									>
										<MatchedSkillsInfo /> Matched skills
									</InputLabel>
									<Slider
										name='countMatchedSkills'
										value={
											values.countMatchedSkills ||
											Math.ceil(values.skills.length / 2)
										}
										max={values.skills.length}
										aria-labelledby='input-slider'
										valueLabelDisplay='auto'
										marks={[
											{
												value: 0,
												label: 0,
											},
											{
												value: values.skills.length,
												label: values.skills.length,
											},
										]}
										onChange={event =>
											setFieldValue('countMatchedSkills', event.target.value)
										}
									/>
								</>
							)}
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
									action={PUBLISH}
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
