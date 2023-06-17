import React from 'react';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../../../assets/defaultTalent.png';
import styles from '../../Proof.module.css';
import { useSelector } from 'react-redux';
import { getRole } from '../../../../../redux/reducers/authentification';
import { TimeStapm } from '../ProofTitle/components/TimeStamp';

export const Author = ({ id, name, avatar, timestamp, authorRole }) => {
	const navigate = useNavigate();
	const role = useSelector(getRole);
	const handleClick = () => {
		role && navigate(`/profile/${authorRole}/${id}`);
	};
	return (
		<div className={styles.authorBlock} onClick={handleClick}>
			<Avatar src={avatar || defaultAvatar} sx={{ width: 40, height: 40 }} />
			<div className={styles.authorName}>
				<h4>{name}</h4>
				<TimeStapm published={timestamp} justTime={true} />
			</div>
		</div>
	);
};
