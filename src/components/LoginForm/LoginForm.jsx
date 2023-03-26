import { Dialog, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik, Form } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Context } from '../../context';
import styles from './LoginForm.module.css';
import { validationSchema } from './validation';
import { FormField } from '../shared/FormField/FormField';

export const LoginForm = () => {
	const { talent, setIsTalent } = useContext(Context);
	const [open, setOpen] = useState(true);

	const navigate = useNavigate();

	useEffect(() => setOpen(true), []);

	const handleClose = () => {
        setOpen(false);
        navigate('/');
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
                    onSubmit={values => {
                        setIsTalent(true);
                        navigate(`/talent/${talent.id}`);
                    }}
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
								<span className={styles.signInElement}>SIGN IN</span>
							</Typography>
						</Form>
					)}
				</Formik>
				<CloseIcon className={styles.closeIcon} onClick={handleClose} />
			</Dialog>
		</>
	);
};
