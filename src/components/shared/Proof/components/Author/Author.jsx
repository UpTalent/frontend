import React from 'react';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../../../assets/defaultTalent.png';
import styles from '../../Proof.module.css';
import { TimeStapm } from '../ProofTitle/components/TimeStamp';

export const Author = ({ id, name, avatar, timestamp, authorRole }) => {
	const navigate = useNavigate();
	
	const handleClick = () => {
<<<<<<< HEAD
		authorRole === 'talent' && navigate(`/profile/talent/${id}`);
=======
		// role === 'talent' && navigate(`/profile/talent/${id}`);
		navigate(`/profile/talent/${id}`);
>>>>>>> 040541ad4b3114efe9b851743329c0636b634ed0
	};
	return (
		<div className={styles.authorBlock} onClick={handleClick}>
			<Avatar src={avatar || defaultAvatar} sx={{ width: 40, height: 40 }} />
			<div className={authorRole && styles.authorName}>
				<h4>{name}</h4>
				<TimeStapm published={timestamp} justTime={true} />
			</div>
		</div>
	);
};
