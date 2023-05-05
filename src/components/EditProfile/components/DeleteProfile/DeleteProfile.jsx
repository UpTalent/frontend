import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileAPI } from '../../../../api/profileAPI';
import styles from '../../../LoginForm/Forms.module.css';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../redux/reducers/systemMessages';
import { logOut } from '../../../../redux/reducers/authentification';
import { sponsorApi } from '../../../../api/sponsorAPI';

export const DeleteProfile = ({ userId, message, role }) => {
	const apiHandler = role === 'talent' ? profileAPI : sponsorApi;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [modal, toggleModal] = useState(false);

	const deleteProfile = async () => {
		try {
			await apiHandler.deleteProfile(userId);
			dispatch(logOut());
			dispatch(setSystemMessage(true, 'Your profile was deleted', 'info'));
			navigate('/home');
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
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
				<DialogTitle id='alert-dialog-title'>{message.title}</DialogTitle>
				<DialogContent sx={{ color: '#797575' }}>{message.text}</DialogContent>
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
