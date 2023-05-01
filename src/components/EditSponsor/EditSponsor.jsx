import React, { useState } from 'react';
import styles from '../LoginForm/Forms.module.css';
import { Form, Formik } from 'formik';
import { Button, InputAdornment, TextField } from '@mui/material';
import { FormField } from '../shared/FormField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { validationSchema } from './validation';
import { withEdit } from '../../service/HOC/withEdit';
import { sponsorApi } from '../../api/sponsorAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getUserKudos } from '../../redux/reducers/authentification';
import { ButtonGroup } from './components/AddBtn/ButtonGroup';
import { setSystemMessage } from '../../redux/reducers/systemMessages';
import { MAX_KUDOS } from '../../service/constants';

const EditSponsor = ({ user, edit }) => {
	const initialEditData = {
		id: user.id,
		fullname: user.fullname,
	};

	const currentKudos = useSelector(getUserKudos);
	const dispatch = useDispatch();

	const [kudosValue, setKudosValue] = useState(0);

	const handleSubmit = async values => {
		try {
			kudosValue > 0 &&
				(await sponsorApi.updateKudosQuantity(user.id, kudosValue));
			edit(values);
		} catch (err) {
			dispatch(setSystemMessage(true, err.message, 'error'));
		}
	};

	const handleChange = e => {
		const current = e.target.value;
		if (current < MAX_KUDOS) {
			setKudosValue(Number(current));
		} else {
			setKudosValue(MAX_KUDOS);
		}
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
					<div className={styles.kudos}>
						<p>
							Balance: <b>{currentKudos} </b>KUDOS
						</p>
						<div className={styles.controls}>
							<TextField
								label='Add Kudos'
								value={kudosValue}
								type='number'
								step={10}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<PetsOutlinedIcon />
										</InputAdornment>
									),
								}}
								onChange={handleChange}
							/>
							<ButtonGroup setValue={setKudosValue} />
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
