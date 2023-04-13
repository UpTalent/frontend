import { Alert, Autocomplete, Button, Dialog, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../shared/FormField';
import { validationSchema } from './validation';
import styles from '../LoginForm/LoginForm.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { talentsAPI } from '../../api/talentsAPI';
import { DeleteProfile } from './components/DeleteProfile';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../redux/reducers/systemMessages';
import { skills } from '../../assets/static/skills';
import { updateFirstName } from '../../redux/reducers/authentification';

export const EditProfile = ({ talent, setTalent }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	let initialEditData = {
		lastname: talent.lastname,
		firstname: talent.firstname,
		location: talent.location,
		birthday: talent.birthday,
		skills: talent.skills,
		about_me: talent.about_me,
	};

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const edit = async formData => {
		const editData = { ...formData };
		try {
			const { data } = await talentsAPI.edit(talent.id, editData);
			setTalent(data);
			dispatch(updateFirstName(data.firstname))
			dispatch(setSystemMessage(true, 'Your profile was updated successfully!'));
			navigate(`/talent/${talent.id}`);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<Formik
				initialValues={initialEditData}
				validationSchema={validationSchema}
				validateOnChange={true}
				validateOnBlur={true}
				validateOnMount={true}
				onSubmit={edit}
			>
				{({
					isValid,
					setFieldValue,
					values,
					setFieldTouched,
					errors,
					setFieldError,
					touched,
				}) => (
					<Form className={styles.registrationForm}>
						<div className={styles.formTitle}>Personal information</div>
						<div className={styles.talentName}>
							<FormField label='Firstname' name='firstname' />
							<FormField label='Lastname' name='lastname' />
						</div>
						<FormField label='Location' name='location' type='text' />
						<FormField label='Birthday' name='birthday' type='date' />
						<Field
							name='skills'
							component={Autocomplete}
							options={skills}
							getOptionLabel={option => option}
							renderInput={(params, i) => (
								<TextField
									label='Tell us what you can...'
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
								maxWidth: '500px',
							}}
							multiple
							limitTags={3}
							freeSolo
							fullWidth
							onChange={(e, value) => {
								setFieldValue('skills', value);
								setFieldTouched('skills', true, false);
							}}
							value={values.skills}
							onClick={() => {
								setFieldError('skills');
							}}
						/>
						{touched.skills && errors.skills ? (
							<div className={styles.skilsError}>{errors.skills}</div>
						) : null}
						<FormField label='About me' name='about_me' type='text' />

						<Button
							type='submit'
							variant='contained'
							className={styles.logInButton}
							disabled={!isValid}
						>
							SAVE
						</Button>
						<DeleteProfile talent_id={talent.id} />
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
