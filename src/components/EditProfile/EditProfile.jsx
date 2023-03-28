import {
	Alert,
	Autocomplete,
	Button,
	Dialog,
	formHelperTextClasses,
	TextField,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormField } from '../shared/FormField';
import { validationSchema } from './validation';
import styles from '../LoginForm/LoginForm.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { talentsAPI } from '../../api/talentsAPI';
import { Context } from '../../context';
import { useParams } from 'react-router-dom';

export const EditProfile = ({ modal, setModal }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { talentId } = useParams();
	const [error, setError] = useState(null);
	const { setAuthTalent, setIsTalent, authTalent, setTalent } =
		useContext(Context);

	let initialEditData = {
		lastname: authTalent.lastname,
		firstname: authTalent.firstname,
		location: (authTalent.location = ''),
		birthday: (authTalent.birthday = ''),
		skills: [authTalent.skills.join(', ')],
		about_me: (authTalent.about_me = ''),
	};
	const skills = ['Java', 'JavaScript', 'CSS', 'Python', 'HTML', 'Jira'];

	const handleClose = () => {
		setModal(false);
		navigate(location.state?.from ? location.state.from : '/home');
	};

	const edit = async formData => {
		const editData = { ...formData };

		try {
			const { data } = await talentsAPI.edit(authTalent.id, editData);
			console.log(data);
		} catch (err) {
			setError(err.message);
			console.log(err.message);
		}
	};

	const getTalentProfile = async () => {
		const { data } = await talentsAPI.getTalent(talentId);
		await setTalent(data);
	};

	useEffect(() => {
		getTalentProfile();
	}, []);

	return (
		<Dialog open={modal} onClose={handleClose}>
			<Formik
				initialValues={initialEditData}
				// validationSchema={validationSchema}
				// validateOnChange={true}
				// validateOnBlur={true}
				// validateOnMount={true}
				onSubmit={edit}
			>
				{({ isValid, setFieldValue }) => (
					<Form className={styles.registrationForm}>
						<label>Personal information</label>
						<div className={styles.talentName}>
							<FormField label='Firstname' name='firstname' />
							<FormField label='Lastname' name='lastname' />
						</div>
						<FormField label='Location' name='location' type='text' />
						<FormField label='Birthday' name='birthday' type='text' />
						<Field
							name='skills'
							label='Tell us what you can do'
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
						<FormField label='About me' name='about_me' type='text' />

						<Button
							type='submit'
							variant='contained'
							className={styles.logInButton}
							disabled={!isValid}
						>
							SAVE
						</Button>
						<Button variant='contained' className={styles.logInButton}>
							DELETE PROFILE
						</Button>
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
	);
};
