import {
	Alert,
	Autocomplete,
	Button,
	Dialog,
	TextField,
	Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormField } from '../shared/FormField';
import { validationSchema } from './validation';
import styles from '../LoginForm/LoginForm.module.css';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { talentsAPI } from '../../api/talentsAPI';
import { Context } from '../../context';
import { setAuthToken } from '../../api';

export const RegistrationForm = () => {
	const [modal, setModal] = useState(true);
	const [error, setError] = useState(null);

	const { setAuthTalent, setIsTalent } = useContext(Context);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setModal(true);
	}, []);

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
		navigate(location.state?.from ? location.state.from : '/home');
	};

	const register = async formData => {
		const registerData = { ...formData };
		delete registerData.confirmPassword;

		try {
			const { data } = await talentsAPI.registrate(registerData);

			setAuthToken(data.jwt_token);
			
			const talentProfile = await talentsAPI.getTalent(data.talent_id);

			await setAuthTalent(talentProfile.data);
			await setIsTalent(true);

			navigate(`/talent/${data.talent_id}`);

		} catch (err) {
			setError(err.message);
			console.log(err.message);
		}
	};

	const skills = ['Java', 'JavaScript', 'CSS', 'Python', 'HTML', 'Jira'];

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
										variant='standard'
									/>
								)}
								sx={{
									'& .MuiAutocomplete-tag': {
										backgroundColor: '#48bde2',
										color: '#fff',
									},
								}}
								multiple
								limitTags={3}
								freeSolo
								fullWidth
								onChange={(e, value) => setFieldValue('skills', value)}
							/>
							<Button
								type='submit'
								variant='contained'
								disabled={!isValid}
								className={styles.logInButton}
							>
								SIGN UP
							</Button>
							<Typography>
								Are you a talent already?
								<span
									className={styles.signInElement}
									onClick={() => {
										navigate(`${location.pathname.slice(0, -10)}login`);
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
