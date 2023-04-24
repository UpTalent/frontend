import React from 'react';
import styles from '../LoginForm/LoginForm.module.css';
import { Form, Formik } from 'formik';
import { Button } from '@mui/material';
import { FormField } from '../shared/FormField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { validationSchema } from './validation';
import { withEdit } from '../../HOC/withEdit';

const EditSponsor = ({ user, edit }) => {
	let initialEditData = {
		fullname: user.fullname,
		kudos: user.kudos,
	};
	return (
		<Formik
			initialValues={initialEditData}
			validationSchema={validationSchema}
			validateOnChange={true}
			validateOnBlur={true}
			validateOnMount={true}
			onSubmit={edit}
		>
			{({ isValid }) => (
				<Form className={styles.registrationForm}>
					<div className={styles.formTitle}>Personal information</div>
					<FormField
						label='Fullname'
						name='fullname'
						required={true}
						icon={<AccountCircleOutlinedIcon />}
					/>

					<FormField
						label='Kudos'
						name='kudos'
						type='number'
						required={true}
						icon={<AccountCircleOutlinedIcon />}
					/>

					<Button
						type='submit'
						variant='contained'
						className={styles.logInButton}
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
