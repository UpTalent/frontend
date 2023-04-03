import {
	Alert,
	Autocomplete,
	Button,
	Dialog,
	TextField,
	Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormField } from '../shared/FormField';
import { validationSchema } from './validation';
import styles from '../LoginForm/LoginForm.module.css';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Context } from '../../context';
import { parseJwt, setAuthToken } from '../../api';
import { authAPI } from '../../api/authAPI';

export const RegistrationForm = () => {
	const [modal, setModal] = useState(true);
	const [error, setError] = useState(null);

	const { setAuthTalent, setIsTalent, skills } = useContext(Context);

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

	const handleClose = () => {
		setModal(false);
		navigate({
			pathname: location.pathname.slice(0, -9),
			search: location.search,
		});
	};

	const register = async formData => {
		const registerData = { ...formData };
		delete registerData.confirmPassword;

		try {
			const { data } = await authAPI.register(registerData);
			setAuthToken(data.jwt_token);

			const { firstname, talent_id } = parseJwt(data.jwt_token);

			setAuthTalent({ talent_id, firstname });
			setIsTalent(true);

			navigate(`/talent/${talent_id}`);
		} catch (err) {
			setError(err.message);
			console.log(err.message);
		}
	};

	return (
		<>
			<Dialog open={modal} onClose={handleClose}>
				<Formik
					initialValues={initialRegistartionData}
					validationSchema={validationSchema}
					validateOnChange={true}
					validateOnBlur={true}
					validateOnMount={true}
					onSubmit={register}
				>
					{({
						isValid,
						setFieldValue,
						setFieldTouched,
						errors,
						setFieldError,
						touched,
					}) => (
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
										label='Tell us what you can...'
										variant='standard'
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
									setFieldTouched('skills', true, false);
								}}
								onClick={() => {
									setFieldError('skills');
								}}
							/>
							{touched.skills && errors.skills ? (
								<div className={styles.skilsError}>{errors.skills}</div>
							) : null}
							<Button
								type='submit'
								variant='contained'
								disabled={!isValid}
								className={styles.logInButton}
							>
								REGISTER
							</Button>
							<Typography>
								Are you a talent already?
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
				<CloseIcon className={styles.closeIcon} onClick={handleClose} />
				{error && (
					<Alert severity='error' onClose={() => setError(null)}>
						{error}
					</Alert>
				)}
			</Dialog>
		</>
	);
};
