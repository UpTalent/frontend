import { Alert, Button, Dialog } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../LoginForm/LoginForm.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreDispatch } from '../../redux/store';
import {
	authentificateTalent,
	clearError,
	getAuthId,
	getErrors,
} from '../../redux/reducers/authentification';
import { useSelector } from 'react-redux';
import { TalentForm } from './components/TalentForm';
import { SponsorForm } from './components/SponsorForm';

export const RegistrationForm = () => {
	const [modal, setModal] = useState(true);
	const [role, setRole] = useState(null);

	const dispatch = useStoreDispatch();
	const id = useSelector(getAuthId);
	const authError = useSelector(getErrors);

	const navigate = useNavigate();
	const location = useLocation();

	const handleClose = () => {
		setModal(false);
		navigate({
			pathname: location.pathname.slice(0, -9),
			search: location.search,
		});
	};

	useEffect(() => {
		if (id) {
			navigate(`/${role}/${id}`);
		}

		if (authError) {
			dispatch(clearError());
		}
	}, [id]);

	const register = async formData => {
		const registerData = { ...formData };
		delete registerData.confirmPassword;

		const data = { talentInfo: registerData, role };

		dispatch(authentificateTalent(data));
	};

	return (
		<>
			<Dialog open={modal} onClose={handleClose}>
				{!role && (
					<>
						<div>Choose role</div>
						<Button onClick={() => setRole('talent')}>Talent</Button>
						<Button onClick={() => setRole('sponsor')}>Sponsor</Button>
					</>
				)}
				{role && (
					<>
						{role === 'talent' ? (
							<TalentForm register={register} />
						) : (
							<SponsorForm register={register} />
						)}
					</>
				)}
				<CloseIcon className={styles.closeIcon} onClick={handleClose} />
				{authError && (
					<Alert severity='error' onClose={() => dispatch(clearError())}>
						{authError}
					</Alert>
				)}
			</Dialog>
		</>
	);
};
