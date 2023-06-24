import React from 'react';
import styles from '../../Vacancy.module.css';
import { Author } from '../../../shared/Proof/components/Author';
import { SkillBox } from '../../../shared/SkillBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { SponsorContainer } from '../../../shared/PostControl/SponsorContainer';

export const VacancyGeneral = ({ vacancy, showControlls, ...props }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const redirectToFull = () => {
		const linkTitle = location.pathname.split('/').at(-1);
		const currentPath = {
			link: location.pathname + location.search,
			name:
				linkTitle[0].toUpperCase() + linkTitle.substring(1, linkTitle.length),
		};
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
				<SkillBox skills={vacancy.skills} />
			</div>
		</div>
	);
};
