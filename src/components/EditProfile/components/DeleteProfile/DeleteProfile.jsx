import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../../../api';
import { profileAPI } from '../../../../api/profileAPI';
import { Context } from '../../../../context';
import styles from '../../../LoginForm/LoginForm.module.css';

export const DeleteProfile = ({ talent_id }) => {
	const navigate = useNavigate();
	const { setIsTalent, setMessageForUser } = useContext(Context);
	const [modal, toggleModal] = useState(false);

	const deleteProfile = async () => {
		await profileAPI.deleteProfile(talent_id);
		setAuthToken();
		setIsTalent(false);
		setMessageForUser(true);
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
				<DialogActions >
					<Button variant='outlined' onClick={closeModal}>Cancel</Button>
					<Button variant='outlined' onClick={deleteProfile} color='error'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
