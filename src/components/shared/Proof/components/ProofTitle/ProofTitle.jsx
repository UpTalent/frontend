import React from 'react';
import styles from '../../Proof.module.css';
import { ProofIcons } from '../../../../../assets/static/ProofIcons';
import { TimeStapm } from './components/TimeStamp';
import { TalentsControl } from './components/TalentsControl';

export const ProofTitle = ({
	title,
	published,
	icon_number,
	status,
	showControlls,
	openContent,
	proofId,
}) => {
	return (
		<div className={styles.ProofTitle}>
			<div className={styles.controls}>
				<TimeStapm published={published} />
				{showControlls && <TalentsControl status={status} proofId={proofId} />}
			</div>
			<div className={styles.title} onClick={openContent}>
				<img
					src={icon_number ? ProofIcons[icon_number].icon : ProofIcons[0].icon}
					alt={`${icon_number}`}
				/>
				<p>{title}</p>
			</div>
			{showControlls && (
				<div className={`${styles.status} ${styles[status]}`}>
					<p>{status}</p>
				</div>
			)}
		</div>
	);
};
