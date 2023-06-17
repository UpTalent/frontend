import React from 'react';
import styles from '../../../../Proof.module.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Moment from 'react-moment';
import moment from 'moment';
import { DisabledText } from '../../../../../DisabledText/DisabledText';

export const TimeStapm = ({ published, justTime }) => {
	const week = 604800000;

	return (
		<DisabledText
			condition={!justTime}
			helperText={moment(published).format('MMMM Do YYYY, HH:mm')}
		>
			<div className={styles.timeStamp}>
				{published && (
					<>
						{!justTime && (
							<AccessTimeIcon color='action' sx={{ fontSize: 'inherit' }} />
						)}
						<Moment format='MMM, DD, YYYY' fromNowDuring={week}>
							{published}
						</Moment>
					</>
				)}
			</div>
		</DisabledText>
	);
};
