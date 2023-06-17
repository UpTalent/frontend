import React from 'react';
import styles from '../../Vacancy.module.css';
import { Author } from '../../../shared/Proof/components/Author';
import { SkillBox } from '../../../shared/SkillBox';
import { useNavigate } from 'react-router-dom';

export const VacancyGeneral = ({ title, published, author, skills, id }) => {
	const navigate = useNavigate();
	
	return (
		<div className={styles.vacancyGeneral} >
			<div className={styles.authorBlock}>
				<Author {...author} timestamp={published} authorRole={'sponsor'} />
			</div>
			<div className={styles.mainInfo} onClick={() => navigate(`/vacancy/${id}`)}>
				<h3>{title}</h3>
				<SkillBox skills={skills} />
			</div>
		</div>
	);
};
