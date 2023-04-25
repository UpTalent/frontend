import React from 'react';
import styles from '../LoginForm/Forms.module.css';
import { Form, Formik } from 'formik';
import { Button } from '@mui/material';
import { FormField } from '../shared/FormField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { validationSchema } from './validation';
import { withEdit } from '../../HOC/withEdit';
import { sponsorApi } from '../../api/sponsorAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getUserKudos, setKudos } from '../../redux/reducers/authentification';

const EditSponsor = ({ user, edit }) => {
	let initialEditData = {
		id: user.id,
		fullname: user.fullname,
		kudos: user.kudos,
	};
	const dispatch = useDispatch();
	const currentKudos = useSelector(getUserKudos);

	const handleSubmit = async values => {
		const { status } = await sponsorApi.updateKudosQuantity(
			user.id,
			values.kudos,
		);
		if (status === 204) {
			dispatch(setKudos(currentKudos + values.kudos));
		}
		edit(values);
	};
	return (
		<Formik
			initialValues={initialEditData}
			validationSchema={validationSchema}
			validateOnChange={true}
			validateOnBlur={true}
			validateOnMount={true}
			onSubmit={handleSubmit}
		>
			{({ isValid }) => (
				<Form className={styles.registrationForm}>
					<div className={styles.editTitle}>Personal information</div>
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
						step={10}
						required={true}
						icon={<PetsOutlinedIcon />}
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
