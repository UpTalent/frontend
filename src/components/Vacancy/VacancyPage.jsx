import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { vacancyAPI } from '../../api/vacancyAPI';
import styles from './Vacancy.module.css';
import { CircularProgress } from '@mui/material';
import { Author } from '../shared/Proof/components/Author';
import { TimeStapm } from '../shared/Proof/components/ProofTitle/components/TimeStamp';
import { SkillBox } from '../shared/SkillBox';
import { useSelector } from 'react-redux';
import { getAuthId } from '../../redux/reducers/authentification';
import { SponsorContainer } from '../shared/PostControl/SponsorContainer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { CustomBreadcrumbs } from '../shared/CustomBreadcrumbs';

export const VacancyPage = () => {
	const { vacancyId } = useParams();
	const location = useLocation();

	const [vacancy, setVacancy] = useState(null);
	const authId = useSelector(getAuthId);

	const fetchVacancy = async () => {
		const { data } = await vacancyAPI.getVacancy(vacancyId);
		setVacancy(data);
	};
	
	useEffect(() => {
		fetchVacancy();
	}, []);

	return (
		<div className={styles.vacancyContainer}>
			{vacancy ? (
				<>
					<CustomBreadcrumbs
						relatedLinks={[...location?.state, { name: vacancy.title }]}
					/>
					<div className={styles.header}>
						<h1>{vacancy.title}</h1>
						{authId === vacancy?.author?.id && vacancy && (
							<SponsorContainer {...{ vacancy, showControl: true }} />
						)}
					</div>
					<div className={styles.author}>
						<Author {...vacancy.author} />
						<TimeStapm published={vacancy.published} />
					</div>
					<div className={styles.content}>
						<aside className={styles.extraBlock}>
							<div className={styles.extraItem}>
								<p>Required: </p>
								<SkillBox skills={vacancy.skills} />
							</div>
						</aside>
						<div>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{vacancy.content}
							</ReactMarkdown>
						</div>
					</div>
				</>
			) : (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			)}
		</div>
	);
};
