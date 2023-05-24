import React, { useState } from 'react';
import verifyImg from '../../assets/1verify.png';
import { Button, Typography } from '@mui/material';
import styles from './VerifyEmail.module.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../redux/reducers/systemMessages';
import { saveUser } from '../../redux/reducers/authentification';
import { authAPI } from '../../api/authAPI';

export const VerifyEmail = () => {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const [isFetching, setIsFetching] = useState(false);
	const [userEmail, setUserEmail] = useState('email@gamil.com');

	const verify = async () => {
		try {
			setIsFetching(true);
			const { data } = await authAPI.verifyEmail(searchParams.get('token'));
			dispatch(
				setSystemMessage(
					true,
					'Your profile was successfuly verified',
					'success',
				),
			);
			dispatch(saveUser({ token: data.jwt_token }));
			setIsFetching(false);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
			setIsFetching(false);
		}
	};
	return (
		<div className={styles.container}>
			<img
				src={verifyImg}
				alt='Verify-email-picture'
				className={styles.verifyImg}
			/>
			<Typography className={styles.title}>
				Verify your email address
			</Typography>
			<div className={styles.text}>
				<p>
					You've entered <b>{userEmail}</b> as the email address for your
					account.
				</p>
				<p>Please verify the email address by ckicking button below.</p>
			</div>
			<Button onClick={verify} disabled={isFetching} variant='contained'>
				Verify your email
			</Button>
		</div>
	);
};
