import React from 'react';
import styles from '../../Proof.module.css';
import { ProofIcons } from '../../../../../assets/static/ProofIcons';
import { TimeStapm } from './components/TimeStamp';
import { TalentsControl } from './components/TalentsControl';
import { ReactFitty } from 'react-fitty';
import { KudosContainer } from './components/Kudos';

export const ProofTitle = ({
	title,
	published,
	icon_number,
	status,
	showControlls,
	openContent,
	proofId,
	is_pressed,
	kudos,
	withContent,
}) => {
	return (
		<div className={styles.ProofTitle}>
			<div className={styles.controls}>
				<TimeStapm published={published} />
				{withContent && showControlls && (
					<TalentsControl status={status} proofId={proofId} />
				)}
			</div>
			<div className={styles.title} onClick={openContent}>
				<img
					src={icon_number ? ProofIcons[icon_number].icon : ProofIcons[0].icon}
					alt={`${icon_number}`}
				/>
				<ReactFitty maxSize={40} minSize={5} wrapText={true}>
					<p>{title}</p>
				</ReactFitty>
			</div>
			<div className={styles.bottomPanel}>
				{withContent && (
					<KudosContainer is_pressed={is_pressed} kudos={kudos} />
				)}
				{withContent && showControlls && (
					<div className={`${styles.status} ${styles[status]}`}>
						<p>{status}</p>
					</div>
				)}
			</div>
		</div>
	);
};
