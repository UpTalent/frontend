import React, { useEffect, useState } from 'react';
import verifyImg from '../../assets/1verify.png';
import { Button, Typography } from '@mui/material';
import styles from './VerifyEmail.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSystemMessage } from '../../redux/reducers/systemMessages';
import {
	authentificateTalent,
	getAuthUser,
} from '../../redux/reducers/authentification';
import { authAPI } from '../../api/authAPI';

export const VerifyEmail = () => {
	const [isFetching, setIsFetching] = useState(false);
	const [userEmail] = useState(localStorage.getItem('email'));

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const user = useSelector(getAuthUser);

	useEffect(() => {
		if (user.id && user.role) {
			navigate(`/profile/${user.role.toLowerCase()}/${user.id}`);
		}
	}, [user.id, user.role]);

	const verify = async () => {
		setIsFetching(true);
		try {
			const { data } = await authAPI.verifyEmail(searchParams.get('token'));

			dispatch(authentificateTalent({ userInfo: { token: data.jwt_token } }));

			dispatch(
				setSystemMessage(
					true,
					'Your profile was successfuly verified',
					'success',
				),
			);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
		setIsFetching(false);
	};
	return (
		<div className={styles.container}>
			<img src={verifyImg} alt='Verify-email' className={styles.verifyImg} />
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
