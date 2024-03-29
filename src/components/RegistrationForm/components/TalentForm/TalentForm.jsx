import { Button, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import styles from '../../../LoginForm/Forms.module.css';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { validationSchema } from './validation';
import { FormField } from '../../../shared/FormField';
import { useStoreDispatch } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { getAllSkills, getSkills } from '../../../../redux/reducers/skills';
import { useEffect } from 'react';
import { FieldForSkills } from '../../../shared/FieldForSkills/FieldForSkills';

export const TalentForm = ({ register }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useStoreDispatch();
	const skills = useSelector(getAllSkills);

	let initialRegistartionData = {
		email: '',
		password: '',
		lastname: '',
		firstname: '',
		confirmPassword: '',
		skills: [],
	};

	useEffect(() => {
		if (skills.length === 0) {
			dispatch(getSkills());
		}
	}, []);
	return (
		<Formik
			initialValues={initialRegistartionData}
			validationSchema={validationSchema}
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
					<FieldForSkills setFieldValue={setFieldValue} />
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
