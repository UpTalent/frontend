import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { vacancAPI } from '../../api/vacancyAPI';
import styles from './Vacancy.module.css';
import { CircularProgress } from '@mui/material';
import { Author } from '../shared/Proof/components/Author';
import { TimeStapm } from '../shared/Proof/components/ProofTitle/components/TimeStamp';
import { SkillBox } from '../shared/SkillBox';

export const VacancyPage = () => {
	const { vacancyId } = useParams();
	const [vacancy, setVacancy] = useState(null);

	const fetchVacancy = async () => {
		const { data } = await vacancAPI.getVacancy(vacancyId);
		setVacancy(data);
	};
	useEffect(() => {
		fetchVacancy();
	}, []);
	return (
		<div className={styles.vacancyContainer}>
			{vacancy ? (
				<>
					<h1>{vacancy.title}</h1>
					<div className={styles.author}>
						<Author {...vacancy.author} authorRole={'sponsor'} />
						<TimeStapm published={vacancy.published} />
					</div>
					<div className={styles.content}>
						<aside className={styles.extraBlock}>
							<div className={styles.extraItem}>
								<p>Required: </p>
								<SkillBox skills={vacancy.skills} />
							</div>
						</aside>
						<div>{vacancy.content}</div>
					</div>
				</>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};
