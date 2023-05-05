import { Autocomplete, Button, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { FormField } from '../shared/FormField';
import { validationSchema } from './validation';
import styles from '../LoginForm/Forms.module.css';
import { DeleteProfile } from './components/DeleteProfile';
import { withEdit } from '../../service/HOC/withEdit';
import { useSelector } from 'react-redux';
import { getAllSkills, getSkills } from '../../redux/reducers/skills';
import { useStoreDispatch } from '../../redux/store';

const EditTalent = ({ user, edit }) => {
	let initialEditData = {
		lastname: user.lastname,
		firstname: user.firstname,
		location: user.location,
		birthday: user.birthday,
		skills: user.skills,
		about_me: user.about_me,
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
					<Field
						name='skills'
						component={Autocomplete}
						options={skills}
						getOptionLabel={option => option.name}
						renderInput={(params, i) => (
							<TextField
								label='Skills'
								key={i}
								{...params}
								name='skill'
								variant='outlined'
							/>
						)}
						sx={{
							'& .MuiAutocomplete-tag': {
								backgroundColor: '#48bde2',
								color: '#fff',
							},
							maxWidth: '500px',
						}}
						multiple
						limitTags={3}
						fullWidth
						onChange={(event, value) => {
							const selectedSkills = value.map(skill => ({
								id: skill.id,
								name: skill.name,
							}));
							setFieldValue('skills', selectedSkills);
						}}
						value={values.skills}
						isOptionEqualToValue={(option, value) => option.id === value.id}
					/>
					<Field
						label='About me'
						name='about_me'
						multiline
						fullWidth
						rows={6}
						as={TextField}
						error={touched.content && Boolean(errors.content)}
						helperText={touched.content && errors.content}
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
						<DeleteProfile talent_id={user.id} />
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default withEdit(EditTalent);
