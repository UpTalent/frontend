import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FormField } from '../shared/FormField';
import { validationSchema } from './validation';
import styles from '../LoginForm/Forms.module.css';
import { DeleteProfile } from './components/DeleteProfile';
import { skills } from '../../assets/static/skills';
import { withEdit } from '../../service/HOC/withEdit';
import { Markdown } from '../shared/FormField/components/Markdown/Markdown';

const EditTalent = ({ user, edit }) => {
	let initialEditData = {
		lastname: user.lastname,
		firstname: user.firstname,
		location: user.location,
		birthday: user.birthday,
		skills: user.skills,
		about_me: user.about_me,
	};

	return (
		<Formik
			initialValues={initialEditData}
			validationSchema={validationSchema}
			validateOnChange={true}
			validateOnBlur={true}
			validateOnMount={true}
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
						getOptionLabel={option => option}
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
						onChange={(e, value) => {
							setFieldValue('skills', value);
						}}
						value={values.skills}
					/>
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
						<DeleteProfile talent_id={user.id} />
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default withEdit(EditTalent);
