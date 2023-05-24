import { Alert, Dialog, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Registration.module.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useStoreDispatch } from '../../redux/store';
import { clearError, getErrors } from '../../redux/reducers/authentification';
import { useSelector } from 'react-redux';
import { TalentForm } from './components/TalentForm';
import { SponsorForm } from './components/SponsorForm';
import photo1 from '../../assets/photo1.png';
import { RoleRadio } from './components/RoleRadio/RoleRadio';
import { authAPI } from '../../api/authAPI';
import { setSystemMessage } from '../../redux/reducers/systemMessages';

export const RegistrationForm = () => {
	const [modal, setModal] = useState(true);
	const [role, setRole] = useState(null);

	const dispatch = useStoreDispatch();
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
		if (authError) {
			dispatch(clearError());
		}
	}, [authError]);

	const register = async formData => {
		try {
			const registerData = { ...formData };
			delete registerData.confirmPassword;

			await authAPI.authentificate(registerData, role);
			localStorage.setItem('email', formData.email);
			
			dispatch(
				setSystemMessage(
					true,
					`The email verification letter was sent on ${formData.email}, please confirm your email in 24 hours to activite profile`,
					'info',
				),
			);
			handleClose();
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};

	return (
		<>
			<Dialog
				open={modal}
				onClose={handleClose}
				sx={{
					'& .MuiPaper-root': {
						borderRadius: '10px',
						maxWidth: '100%',
					},
				}}
			>
				{!role && (
					<div className={styles.options}>
						<Typography className={styles.optionsTitle}>
							Choose how you want to register
						</Typography>
						<img src={photo1} className={styles.image} alt='photoTeam' />
						<RoleRadio
							handleSponsor={() => setRole('sponsor')}
							handleTalent={() => setRole('talent')}
						/>
					</div>
				)}
				{role && (
					<>
						{role === 'talent' ? (
							<TalentForm register={register} />
						) : (
							<SponsorForm register={register} />
						)}
						<ArrowBackIcon
							className={styles.undoIcon}
							onClick={() => setRole(null)}
						/>
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
