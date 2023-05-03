import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import styles from '../../../LoginForm/Forms.module.css';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { validationSchema } from './validation';
import { FormField } from '../../../shared/FormField';
import { skills } from '../../../../assets/static/skills';

export const TalentForm = ({ register }) => {
	const navigate = useNavigate();
	const location = useLocation();

	let initialRegistartionData = {
		email: '',
		password: '',
		lastname: '',
		firstname: '',
		confirmPassword: '',
		skills: [],
	};
	return (
		<Formik
			initialValues={initialRegistartionData}
			validationSchema={validationSchema}
			validateOnChange={true}
			validateOnBlur={true}
			validateOnMount={true}
			onSubmit={register}
		>
			{({ isValid, setFieldValue }) => (
				<Form className={styles.registrationForm}>
					<Typography className={styles.formTitle}>
						Join our team!
						<AutoAwesomeIcon />
					</Typography>
					<label>How can we call you?</label>
					<div className={styles.talentName}>
						<FormField label='Firstname' name='firstname' required={true} />
						<FormField label='Lastname' name='lastname' required={true} />
					</div>
					<FormField
						label='Email'
						name='email'
						type='email'
						required={true}
						icon={<AlternateEmailOutlinedIcon />}
					/>
					<FormField
						label='Password'
						name='password'
						type='password'
						required={true}
						icon={<LockOutlinedIcon />}
					/>
					<FormField
						label='Confirm password'
						name='confirmPassword'
						type='password'
						required={true}
						icon={<LockOutlinedIcon />}
					/>
					<Field
						name='skills'
						component={Autocomplete}
						options={skills}
						getOptionLabel={option => option}
						renderInput={(params, i) => (
							<TextField
								key={i}
								{...params}
								name='skill'
								label='Skills'
								variant='outlined'
							/>
						)}
						sx={{
							'& .MuiAutocomplete-tag': {
								backgroundColor: '#48bde2',
								color: '#fff',
							},
							maxWidth: '470px',
						}}
						multiple
						limitTags={3}
						fullWidth
						onChange={(e, value) => {
							setFieldValue('skills', value);
						}}
					/>
					<Button
						type='submit'
						variant='contained'
						disabled={!isValid}
						className={styles.logInButton}
					>
						REGISTER
					</Button>
					<Typography>
						Are you registered already?
						<span
							className={styles.signInElement}
							onClick={() => {
								navigate({
									pathname: `${location.pathname.slice(0, -8)}login`,
									search: location.search,
								});
							}}
						>
							LOG IN
						</span>
					</Typography>
				</Form>
			)}
		</Formik>
	);
};
