import { Alert, Dialog } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/LoginForm/LoginForm.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getRole, updateFirstName } from '../redux/reducers/authentification';
import { talentsAPI } from '../api/talentsAPI';
import { setSystemMessage } from '../redux/reducers/systemMessages';

export const withEdit =
	Component =>
	({ user, setUser }) => {
		const navigate = useNavigate();
		const [open, setOpen] = useState(true);
		const [error, setError] = useState(null);
		const dispatch = useDispatch();
		const role = useSelector(getRole);

		const handleClose = () => {
			setOpen(false);
			navigate(-1);
		};

		const edit = async formData => {
			const editData = { ...formData };
			try {
				const { data } = await talentsAPI.edit(user.id, editData, role);
				setUser(data);
				const name = role === 'talent' ? data.firstname : data.fullname;
				dispatch(updateFirstName(name));
				dispatch(
					setSystemMessage(true, 'Your profile was updated successfully!'),
				);
				navigate(`/talent/${user.id}`);
			} catch (err) {
				setError(err.message);
			}
		};

		return (
			<Dialog open={open} onClose={handleClose}>
				<Component user={user} edit={edit} />
				<CloseIcon className={styles.closeIcon} onClick={handleClose} />
				{error && (
					<Alert severity='error' onClose={() => setError(null)}>
						{error}
					</Alert>
				)}
			</Dialog>
		);
	};
