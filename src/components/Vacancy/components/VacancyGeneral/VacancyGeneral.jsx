import React from 'react';
import styles from '../../Vacancy.module.css';
import { Author } from '../../../shared/Proof/components/Author';
import { SkillBox } from '../../../shared/SkillBox';
import { useNavigate } from 'react-router-dom';
import { SponsorContainer } from '../../../shared/PostControl/SponsorContainer';

export const VacancyGeneral = ({ vacancy, showControlls, ...props }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.vacancyGeneral} >
			<div className={styles.authorBlock}>
				<Author {...vacancy.author} timestamp={vacancy.published} />
				{showControlls && <SponsorContainer {...{vacancy, ...props}} />}
			</div>
			<div className={styles.mainInfo} onClick={() => navigate(`/vacancy/${vacancy.id}`)}>
				<h3>{vacancy.title}</h3>
				<SkillBox skills={vacancy.skills} />
			</div>
		</div>
	);
};
