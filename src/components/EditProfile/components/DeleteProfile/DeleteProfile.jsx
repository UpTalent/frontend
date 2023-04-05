import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
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
	const [modal, toggleModal] = useState(false);

	const deleteProfile = async () => {
		await profileAPI.deleteProfile(talent_id);
		dispatch(logOut());
		dispatch(setSystemMessage(true, 'Your profile was deleted'));
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
				<DialogActions>
					<Button variant='outlined' onClick={closeModal}>
						Cancel
					</Button>
					<Button variant='outlined' onClick={deleteProfile} color='error'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
