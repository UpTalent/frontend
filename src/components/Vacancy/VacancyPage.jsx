import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
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
import { Status } from '../shared/Proof/components/ProofTitle/components/Status/Status';

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
						relatedLinks={[...(location.state ?? []), { name: vacancy.title }]}
					/>
					<div className={styles.header}>
						<div className={styles.leftSide}>
							<h1>{vacancy.title}</h1>
							<Author {...vacancy.author} />
						</div>
						<div className={styles.controllBlock}>
							{authId === vacancy?.author?.id && (
								<>
									<Status status={vacancy.status} />
									<SponsorContainer
										{...{
											vacancy,
											setVacancy,
											showControl: true,
											vacancyFull: true,
										}}
									/>
								</>
							)}
							<TimeStapm published={vacancy.published} />
						</div>
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
			<Outlet
				context={{ mode: 'edit', vacancy, setVacancy, vacancyFull: true }}
			/>
		</div>
	);
};
