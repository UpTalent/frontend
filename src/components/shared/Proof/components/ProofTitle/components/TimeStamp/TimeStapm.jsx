import React from 'react';
import styles from '../../../../Proof.module.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Moment from 'react-moment';

export const TimeStapm = ({ published }) => {
	const week = 604800000;

	return (
		<div className={styles.timeStamp}>
			{published && (
				<>
					<AccessTimeIcon color='action' sx={{ fontSize: 'inherit' }} />
					<Moment format='MMM, DD, YYYY' fromNowDuring={week}>
						{published}
					</Moment>
				</>
			)}
		</div>
	);
};
