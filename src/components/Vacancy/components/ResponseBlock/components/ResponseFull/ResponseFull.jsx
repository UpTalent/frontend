import React from 'react';
import styles from '../../ResponseBlock.module.css';
import { TimeStapm } from '../../../../../shared/Proof/components/ProofTitle/components/TimeStamp';
import { Status } from '../../../../../shared/Proof/components/ProofTitle/components/Status/Status';

export const ResponseFull = ({ message, contact_info, status, sent }) => {
	return (
		<div className={styles.reponseFull}>
			<div className={styles.mainInfo}>
				<p>{message}</p>
				<Status status={status} />
			</div>
			<div className={styles.authorResponse}>
				<p>
					<b> Contact info:</b> {contact_info}
				</p>
				<TimeStapm published={sent} />
			</div>
		</div>
	);
};
