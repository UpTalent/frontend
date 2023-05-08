import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sponsorApi } from '../../api/sponsorAPI';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../redux/reducers/systemMessages';
import styles from './RestoreProfile.module.css';
import recover from '../../assets/recover.jpg';
import arrow from '../../assets/arrow.png';

export const RestoreProfile = () => {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const restore = async () => {
		try {
			await sponsorApi.restoreProfile(searchParams.get('token'));
			dispatch(
				setSystemMessage(
					true,
					'Your profile was successfuly restored',
					'success',
				),
			);
			navigate('/home/login');
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};
	return (
		<div className={styles.container}>
			<img src={recover} alt='recover account' className={styles.recoverImg} />
			<div className={styles.wrapper}>
				<img src={arrow} alt='arrow' className={styles.arrow} />
				<Typography className={styles.title}>
					Click here to restore account
				</Typography>
				<Button onClick={restore} variant='contained'>
					Restore account
				</Button>
			</div>
		</div>
	);
};
