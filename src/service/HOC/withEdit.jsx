import { Dialog } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../components/LoginForm/Forms.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { talentsAPI } from '../../api/talentsAPI';
import {
	getRole,
	updateFirstName,
} from '../../redux/reducers/authentification';
import { setSystemMessage } from '../../redux/reducers/systemMessages';

export const withEdit =
	Component =>
	({ user, setUser }) => {
		const navigate = useNavigate();
		const [open, setOpen] = useState(true);
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
				navigate(`/profile/${role}/${user.id}`);
			} catch (err) {
				dispatch(setSystemMessage(true, err.message, 'error'));
			}
		};

		return (
			<Dialog
				open={open}
				onClose={handleClose}
				sx={{
					'& .MuiPaper-root': {
						borderRadius: '10px',
						maxWidth: '100%',
					},
				}}
			>
				<Component user={user} edit={edit} />
				<CloseIcon className={styles.closeIcon} onClick={handleClose} />
			</Dialog>
		);
	};
