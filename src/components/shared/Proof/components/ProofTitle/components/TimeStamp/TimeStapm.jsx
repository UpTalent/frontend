import React from 'react';
import styles from '../../../../Proof.module.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Moment from 'react-moment';
import { Tooltip } from '@mui/material';
import moment from 'moment';

export const TimeStapm = ({ published }) => {
	const week = 604800000;

	return (
		<Tooltip title={moment(published).format('MMMM Do YYYY, HH:mm')} arrow placement='top'>
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
		</Tooltip>
	);
};
