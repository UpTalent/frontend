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
import {
	getUserEmail,
	getUserKudos,
} from '../../redux/reducers/authentification';
import { ButtonGroup } from './components/AddBtn/ButtonGroup';
import { setSystemMessage } from '../../redux/reducers/systemMessages';
import { MAX_KUDOS } from '../../service/constants';
import { DeleteProfile } from '../EditProfile/components/DeleteProfile';

const EditSponsor = ({ user, edit }) => {
	const initialEditData = {
		id: user.id,
		fullname: user.fullname,
	};

	const currentKudos = useSelector(getUserKudos);
	const userEmail = useSelector(getUserEmail);
	const dispatch = useDispatch();

	const [kudosValue, setKudosValue] = useState(0);

	const handleSubmit = async values => {
		try {
			kudosValue > 1 &&
				(await sponsorApi.updateKudosQuantity(user.id, kudosValue));
			edit(values);
		} catch (err) {
			dispatch(setSystemMessage(true, err.message, 'error'));
		}
	};

	const handleChange = e => {
		const current = e.target.value;
		if (current < MAX_KUDOS - currentKudos) {
			setKudosValue(Number(current));
		} else if (current > MAX_KUDOS - currentKudos) {
			setKudosValue(MAX_KUDOS - currentKudos);
		}
	};

	return (
		<Formik
			initialValues={initialEditData}
			validationSchema={validationSchema}
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
								inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<PetsOutlinedIcon />
										</InputAdornment>
									),
								}}
								onChange={handleChange}
							/>
							<ButtonGroup
								prevValue={kudosValue}
								setValue={setKudosValue}
								currentKudos={currentKudos}
							/>
						</div>
					</div>
					<div className={styles.buttonGroup}>
						<Button
							type='submit'
							variant='contained'
							className={styles.logInButton}
							disabled={!isValid}
						>
							SAVE
						</Button>
						<DeleteProfile
							userId={user.id}
							message={{
								title: 'Are you sure you want to delete your profile?',
								text: (
									<>
										<p>
											You can restore it in <b>7 days</b>.
										</p>
										<p>
											The recovery link will be sent on your email -{' '}
											<b>{userEmail}</b>
										</p>
									</>
								),
							}}
							role={'sponsor'}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default withEdit(EditSponsor);
