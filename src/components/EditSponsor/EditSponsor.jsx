import React from 'react';
import styles from '../LoginForm/Forms.module.css';
import { Form, Formik } from 'formik';
import { Button } from '@mui/material';
import { FormField } from '../shared/FormField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { validationSchema } from './validation';
import { withEdit } from '../../service/HOC/withEdit';
import { sponsorApi } from '../../api/sponsorAPI';
import { useSelector } from 'react-redux';
import { getUserKudos } from '../../redux/reducers/authentification';
import { ButtonGroup } from './components/AddBtn/ButtonGroup';

const EditSponsor = ({ user, edit }) => {
	const initialEditData = {
		id: user.id,
		fullname: user.fullname,
		kudos: 0,
	};

	const currentKudos = useSelector(getUserKudos);

	const handleSubmit = async values => {
		await sponsorApi.updateKudosQuantity(user.id, values.kudos);
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
			{({ isValid, setFieldValue, values }) => (
				<Form className={styles.registrationForm}>
					<div className={styles.editTitle}>Personal information</div>
					<FormField
						label='Fullname'
						name='fullname'
						required={true}
						icon={<AccountCircleOutlinedIcon />}
					/>
					<div className={styles.kudos}>
						<p>
							Balance: <b>{currentKudos} </b>KUDOS
						</p>
						<div className={styles.controls}>
							<FormField
								label='Add Kudos'
								name='kudos'
								type='number'
								step={10}
								required={true}
								icon={<PetsOutlinedIcon />}
							/>
							<ButtonGroup
								kudosCurrent={values.kudos}
								setFieldValue={setFieldValue}
							/>
						</div>
					</div>

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
