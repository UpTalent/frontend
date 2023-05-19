import React from 'react';
import styles from '../../Proof.module.css';
import { ProofIcons } from '../../../../../assets/static/ProofIcons';
import { TimeStapm } from './components/TimeStamp';
import { TalentsControl } from './components/TalentsControl';
import { ReactFitty } from 'react-fitty';
import { SkillArea } from '../SkillArea/SkillArea';

export const ProofTitle = ({
	title,
	published,
	skills,
	icon_number,
	status,
	showControlls,
	openContent,
	id,
	sum_kudos_from_me,
	kudos,
	withContent,
	my_proof,
	inSlider,
	localSkills,
	setLocalSkills,
}) => {
	return (
		<div className={styles.ProofTitle}>
			<div className={styles.controls}>
				<TimeStapm published={published} />
				{withContent && showControlls && (
					<TalentsControl status={status} proofId={id} />
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
				{!inSlider && (
					<SkillArea
						skills={localSkills}
						setLocalSkills={setLocalSkills}
						kudos={{
							sum_kudos_from_me,
							kudos,
							my_proof,
							talentView: sum_kudos_from_me,
							proofId: id,
						}}
						additionalStyle={!withContent && styles.proofPageView}
					/>
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
