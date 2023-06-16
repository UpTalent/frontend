import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CreateVacancy.module.css';
import { Button, Dialog, InputAdornment, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { FormField } from '../shared/FormField';
import { Markdown } from '../shared/FormField/components/Markdown/Markdown';
import { FieldForSkills } from '../shared/FieldForSkills/FieldForSkills';
import { useSelector } from 'react-redux';
import { getAllSkills, getSkills } from '../../redux/reducers/skills';
import { useStoreDispatch } from '../../redux/store';
import { validationSchema } from './validation';
export const CreateVacancy = () => {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();
	const skills = useSelector(getAllSkills);
	const dispatch = useStoreDispatch();

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
		// dispatch(clearProof());
	};
	const vacancies = {
		title: 'Title',
		content: "It's vacancy's content",
		skills: [
			{
				id: 4,
				name: 'Python',
			},
		],
	};

	// const submitHandler = () => {};

	useEffect(() => {
		if (!skills.length) {
			dispatch(getSkills());
		}
	}, [skills.length]);

	return (
		<>
			<Dialog open={open} onClose={handleClose} fullWidth>
				<Formik initialValues={vacancies} validationSchema={validationSchema}>
					{({ isValid, values, touched, errors, setFieldValue }) => (
						<Form className={styles.form}>
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
							<Button
								variant='contained'
								// className={`${isValid && styles.saveButton}`}
								disabled={!isValid}
								// onClick={submitHandler}
								onClick={() => console.log(values)}
							>
								SAVE CHANGES
								{/* {mode === 'create' ? 'SAVE AS DRAFT' : 'SAVE CHANGES'} */}
							</Button>
						</Form>
					)}
				</Formik>
				<CloseIcon className={styles.closeIcon} onClick={handleClose} />
			</Dialog>
		</>
	);
};
