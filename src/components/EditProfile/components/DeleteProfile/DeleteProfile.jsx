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
import { useDispatch, useSelector } from 'react-redux';
import { setSystemMessage } from '../../../../redux/reducers/systemMessages';
import {
	getUserEmail,
	logOut,
} from '../../../../redux/reducers/authentification';
import { sponsorApi } from '../../../../api/sponsorAPI';

export const DeleteProfile = ({ userId, role }) => {
	const apiHandler = role === 'talent' ? profileAPI : sponsorApi;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [modal, toggleModal] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const userEmail = useSelector(getUserEmail);

	const deleteProfile = async () => {
		try {
			setIsFetching(true);
			await apiHandler.deleteProfile(userId);
			setIsFetching(false);
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
				<DialogTitle id='alert-dialog-title'>
					Are you sure you want to delete your profile?
				</DialogTitle>
				<DialogContent sx={{ color: '#797575' }}>
					<p>
						You can restore it in <b>7 days</b>.
					</p>
					<p>
						The recovery link will be sent on your email - <b>{userEmail}</b>
					</p>
				</DialogContent>
				<DialogActions>
					<Button variant='outlined' onClick={closeModal}>
						Cancel
					</Button>
					<Button
						variant='outlined'
						onClick={deleteProfile}
						color='error'
						disabled={isFetching}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
