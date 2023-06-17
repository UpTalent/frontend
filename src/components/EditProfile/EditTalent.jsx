import { Button, InputAdornment, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { FormField } from '../shared/FormField';
import { validationSchema } from './validation';
import styles from '../LoginForm/Forms.module.css';
import { DeleteProfile } from './components/DeleteProfile';
import { withEdit } from '../../service/HOC/withEdit';
import { Markdown } from '../shared/FormField/components/Markdown/Markdown';
import { useSelector } from 'react-redux';
import { getAllSkills, getSkills } from '../../redux/reducers/skills';
import { useStoreDispatch } from '../../redux/store';
import { FieldForSkills } from '../shared/FieldForSkills/FieldForSkills';

const EditTalent = ({ user, edit }) => {
	let initialEditData = {
		lastname: user.lastname,
		firstname: user.firstname,
		location: user.location || '',
		birthday: user.birthday || '',
		skills: user.skills,
		about_me: user.about_me || '',
	};
	const dispatch = useStoreDispatch();
	const skills = useSelector(getAllSkills);

	useEffect(() => {
		if (skills.length === 0) {
			dispatch(getSkills());
		}
	}, []);

	return (
		<Formik
			initialValues={initialEditData}
			validationSchema={validationSchema}
			onSubmit={edit}
		>
			{({ isValid, setFieldValue, values, touched, errors }) => (
				<Form className={styles.registrationForm}>
					<div className={styles.formTitle}>Personal information</div>
					<div className={styles.talentName}>
						<FormField label='Firstname' name='firstname' />
						<FormField label='Lastname' name='lastname' />
					</div>
					<FormField label='Location' name='location' type='text' />
					<FormField label='Birthday' name='birthday' type='date' />
					<FieldForSkills {...{ setFieldValue, values, errors }} />
					<Field
						label='About me'
						name='about_me'
						multiline
						fullWidth
						rows={6}
						as={TextField}
						error={touched.about_me && Boolean(errors.about_me)}
						helperText={touched.about_me && errors.about_me}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Markdown />
								</InputAdornment>
							),
						}}
					/>
					<div className={styles.buttonGroup}>
						<Button
							type='submit'
							variant='contained'
							className={styles.logInButton}
							disabled={!isValid}
						>
							SAVE
						</Button>
						<DeleteProfile userId={user.id} role={'talent'} />
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default withEdit(EditTalent);
