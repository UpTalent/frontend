import React from 'react';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../../../../../assets/defaultTalent.png';
import styles from '../../../../Proof.module.css';
import { useSelector } from 'react-redux';
import { getRole } from '../../../../../redux/reducers/authentification';

export const Author = ({ id, name, avatar }) => {
	const navigate = useNavigate();
	const role = useSelector(getRole);
	const handleClick = () => {
		role === 'talent' && navigate(`/profile/talent/${id}`);
	};
	return (
		<div className={styles.authorBlock} onClick={handleClick}>
			<Avatar src={avatar || defaultAvatar} sx={{ width: 40, height: 40 }} />
			<div>{name}</div>
		</div>
	);
};
