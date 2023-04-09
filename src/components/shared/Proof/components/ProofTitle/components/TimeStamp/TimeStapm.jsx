import React from 'react';
import styles from '../../../../Proof.module.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export const TimeStapm = ({ published }) => {
   
	return (
		<div className={styles.timeStamp}>
			{published && (
				<>
					<AccessTimeIcon color='action' />
					{published}
				</>
			)}
		</div>
	);
};
