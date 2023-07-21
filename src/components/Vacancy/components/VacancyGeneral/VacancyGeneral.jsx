import React from 'react';
import styles from '../../Vacancy.module.css';
import { Author } from '../../../shared/Proof/components/Author';
import { SkillBox } from '../../../shared/SkillBox';
import { useNavigate } from 'react-router-dom';
import { SponsorContainer } from '../../../shared/PostControl/SponsorContainer';
import { Status } from '../../../shared/Proof/components/ProofTitle/components/Status/Status';
import { useHistory } from '../../../../service/hooks/useHistory';

export const VacancyGeneral = ({ vacancy, showControlls, ...props }) => {
	const navigate = useNavigate();
	const currentPath = useHistory();

	const redirectToFull = () => {
		navigate(`/vacancy/${vacancy.id}`, {
			state: [currentPath],
		});
	};

	return (
		<div className={styles.vacancyGeneral}>
			<div className={styles.authorBlock}>
				<Author {...vacancy.author} timestamp={vacancy.published} />
				{showControlls && <SponsorContainer {...{ vacancy, ...props }} />}
			</div>
			<div className={styles.mainInfo} onClick={redirectToFull}>
				<h3>{vacancy.title}</h3>
				<div className={styles.footer}>
					<SkillBox skills={vacancy.skills} additionalStyle={styles.skills} />
					{showControlls && <Status status={vacancy.status} />}
				</div>
			</div>
		</div>
	);
};
