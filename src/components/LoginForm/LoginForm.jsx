import { Dialog, Typography, Button, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styles from './LoginForm.module.css';
import { validationSchema } from './validation';
import { FormField } from '../shared/FormField';
import {
	authentificateTalent,
	clearError,
	getAuthTalentId,
	getErrors,
} from '../../redux/reducers/authentification';
import { useSelector } from 'react-redux';
import { useStoreDispatch } from '../../redux/store';

export const LoginForm = () => {
	const [open, setOpen] = useState(true);
	const [error, setError] = useState(null);

	const dispatch = useStoreDispatch();
	const talent_id = useSelector(getAuthTalentId);
	const authError = useSelector(getErrors);

	const navigate = useNavigate();
	const location = useLocation();

	const handleClose = () => {
		setOpen(false);
		navigate(location.pathname.slice(0, -6), {
			search: location.search,
		});
	};

	useEffect(() => {
		if (talent_id) {
			navigate(`/talent/${talent_id}`);
		}

		if (authError) {
			dispatch(clearError());
		}
	}, [talent_id]);

	useEffect(() => {
		setError(authError);
	}, [authError]);

	const tryToLogin = async formData => {
		const data = { method: 'login', talentInfo: formData };
		dispatch(authentificateTalent(data));
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
										navigate({
											pathname: `${location.pathname.slice(0, -5)}register`,
											search: location.search,
										})
									}
								>
									REGISTER NOW
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
