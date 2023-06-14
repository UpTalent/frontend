import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { vacancAPI } from '../../api/vacancyAPI';
import styles from './Vacancy.module.css';
import { CircularProgress } from '@mui/material';
import { Author } from '../shared/Proof/components/Author';
import { TimeStapm } from '../shared/Proof/components/ProofTitle/components/TimeStamp';

export const VacancyPage = vacancy => {
	// const { vacancyId } = useParams();
	// const [vacancy, setVacancy] = useState(null);

	// const fetchVacancy = async () => {
	// 	const { data } = await vacancAPI.getVacancy(vacancyId);
	// 	setVacancy(data);
	// };
	useEffect(() => {
		// fetchVacancy();
	}, []);
	return (
		<div className={styles.vacancyContainer}>
			{vacancy ? (
				<>
					<h1>{vacancy.title}</h1>
					<Author {...vacancy.author} />
					<TimeStapm published={vacancy.published} />
					<div className={styles.content}>{vacancy.content}</div>
				</>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};
