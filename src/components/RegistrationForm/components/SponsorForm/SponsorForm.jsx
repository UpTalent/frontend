import { Button, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import styles from '../../../LoginForm/LoginForm.module.css';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormField } from '../../../shared/FormField';

export const SponsorForm = ({ register }) => {
	const navigate = useNavigate();
	const location = useLocation();

	let initialRegistartionData = {
		email: '',
		password: '',
		fullname: '',
		confirmPassword: '',
	};
	return (
		<Formik
			initialValues={initialRegistartionData}
			// validationSchema={validationSchema}
			validateOnChange={true}
			validateOnBlur={true}
			validateOnMount={true}
			onSubmit={register}
		>
			{({ isValid }) => (
				<Form className={styles.registrationForm}>
					<Typography className={styles.formTitle}>
						Join our team!
						<AutoAwesomeIcon />
					</Typography>
					<label>How can we call you?</label>
					<FormField label='Name' name='fullname' required={true} />
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
