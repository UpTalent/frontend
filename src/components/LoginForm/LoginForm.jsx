import { Dialog, Typography, Button, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik, Form } from 'formik';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Context } from '../../context';
import styles from './LoginForm.module.css';
import { validationSchema } from './validation';
import { FormField } from '../shared/FormField';
import { parseJwt, setAuthToken } from '../../api';
import { authAPI } from '../../api/authAPI';


export const LoginForm = () => {
	const { setIsTalent, setAuthTalent } = useContext(Context);
	const [open, setOpen] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	const handleClose = () => {
		setOpen(false);
		navigate(location.state?.from ? location.state.from : '/home');
	};

	const tryToLogin = async formData => {
		try {
			const { data } = await authAPI.login(formData);
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
			<Dialog open={open} onClose={handleClose} className={styles.dialogWindow}>
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={validationSchema}
					validateOnChange={true}
					validateOnBlur={true}
					validateOnMount={true}
					onSubmit={tryToLogin}
				>
					{({ isValid }) => (
						<Form className={styles.registrationForm}>
							<Typography className={styles.formTitle}>
								Welcome back!
								<AutoAwesomeIcon />
							</Typography>
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
							<Button
								type='submit'
								variant='contained'
								disabled={!isValid}
								className={styles.logInButton}
							>
								LOG IN
							</Button>
							<Typography>
								ARE YOU NOT A TALENT YET?{' '}
								<span
									className={styles.signInElement}
									onClick={() =>
										navigate(`${location.pathname.slice(0, -5)}registrate`)
									}
								>
									SIGN UP
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
