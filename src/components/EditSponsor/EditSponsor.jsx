import React from 'react';
import styles1 from '../LoginForm/LoginForm.module.css';
import styles2 from './EditSponsor.module.css';
import { Formik } from 'formik';
import { Button } from '@mui/material';
import { Form } from 'react-router-dom';
import { FormField } from '../shared/FormField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { SponsorForm } from '../RegistrationForm/components/SponsorForm/SponsorForm';
import { withEdit } from '../../HOC/withEdit';

const EditSponsor = ({ user, edit }) => {
	let initialEditData = {
		fullname: user.fullname,
		kudos: user.kudos,
	};
	return (
		<Formik
			initialValues={initialEditData}
			//validationSchema={validationSchema}
			validateOnChange={true}
			validateOnBlur={true}
			validateOnMount={true}
			onSubmit={edit}
		>
			{({ isValid }) => (
				<Form className={styles1.registrationForm}>
					<div className={styles1.formTitle}>Personal information</div>
					<FormField
						label='Fullname'
						name='fullname'
						required={true}
						icon={<AccountCircleOutlinedIcon />}
					/>

					<Button
						type='submit'
						variant='contained'
						className={styles1.logInButton}
						disabled={!isValid}
					>
						SAVE
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default withEdit(EditSponsor);
