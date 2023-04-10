import React from 'react';
import styles from '../../../../Proof.module.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const TimeStapm = ({ published }) => {
	const month = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const date = new Date(published);
	const formatedDate = `${
		month[date.getMonth()]
	}, ${date.getDate()}, ${date.getFullYear()}`;

	return (
		<div className={styles.timeStamp}>
			{published && (
				<>
					<AccessTimeIcon color='action' sx={{ fontSize: 'inherit' }} />
					{formatedDate}
				</>
			)}
		</div>
	);
};
