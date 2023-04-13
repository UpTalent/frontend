import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileAPI } from '../../../../api/profileAPI';
import styles from '../../../LoginForm/LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../redux/reducers/systemMessages';
import { logOut } from '../../../../redux/reducers/authentification';

export const DeleteProfile = ({ talent_id }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
=======
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../../../api';
import { profileAPI } from '../../../../api/profileAPI';
import { Context } from '../../../../context';
import styles from '../../../LoginForm/LoginForm.module.css';

export const DeleteProfile = ({ talent_id }) => {
	const navigate = useNavigate();
	const { setIsTalent, setMessageForUser } = useContext(Context);
>>>>>>> main
	const [modal, toggleModal] = useState(false);

	const deleteProfile = async () => {
		await profileAPI.deleteProfile(talent_id);
<<<<<<< HEAD
		dispatch(logOut());
		dispatch(setSystemMessage(true, 'Your profile was deleted'));
=======
		setAuthToken();
		setIsTalent(false);
		setMessageForUser(true);
>>>>>>> main
		navigate('/home');
	};

	const closeModal = () => {
		toggleModal(false);
	};

	return (
		<>
			<Button
				variant='contained'
				className={styles.logInButton}
				color='error'
				onClick={() => toggleModal(true)}
			>
				DELETE PROFILE
			</Button>
			<Dialog
				open={modal}
				onClose={closeModal}
				aria-labelledby='alert-dialog-title'
			>
				<DialogTitle id='alert-dialog-title'>
					Are you sure you want to delete your profile (It's permanent!)
				</DialogTitle>
<<<<<<< HEAD
				<DialogActions>
					<Button variant='outlined' onClick={closeModal}>
						Cancel
					</Button>
=======
				<DialogActions >
					<Button variant='outlined' onClick={closeModal}>Cancel</Button>
>>>>>>> main
					<Button variant='outlined' onClick={deleteProfile} color='error'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
