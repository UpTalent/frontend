import { Dialog, Typography, Button, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styles from './Forms.module.css';
import { validationSchema } from './validation';
import { FormField } from '../shared/FormField';
import {
	authentificateTalent,
	clearError,
	getAuthId,
	getErrors,
	getRole,
} from '../../redux/reducers/authentification';
import { useSelector } from 'react-redux';
import { useStoreDispatch } from '../../redux/store';

export const LoginForm = () => {
	const [open, setOpen] = useState(true);

	const dispatch = useStoreDispatch();
	const id = useSelector(getAuthId);
	const role = useSelector(getRole);
	const authError = useSelector(getErrors);

	const navigate = useNavigate();
	const location = useLocation();

	const handleClose = () => {
		setOpen(false);
		navigate({
			pathname: location.pathname.slice(0, -6),
			search: location.search,
		});
	};

	useEffect(() => {
		if (id && role) {
			navigate(`profile/${role}/${id}`);
		}

		if (authError) {
			dispatch(clearError());
		}
	}, [id, role]);

	const tryToLogin = async formData => {
		const data = { method: 'login', userInfo: formData };
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
								ARE YOU NOT A MEMBER YET?{' '}
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
				{authError && (
					<Alert severity='error' onClose={() => dispatch(clearError())}>
						{authError}
					</Alert>
				)}
			</Dialog>
		</>
	);
};
