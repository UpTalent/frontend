import React from 'react';
import styles from '../../Vacancy.module.css';
import { Author } from '../../../shared/Proof/components/Author';
import { TimeStapm } from '../../../shared/Proof/components/ProofTitle/components/TimeStamp';

export const VacancyGeneral = ({ title, published, author, skills }) => {
	return (
		<div className={styles.vacancyGeneral}>
			<div className={styles.authorBlock}>
				<Author {...author} />
				<TimeStapm published={published} />
			</div>
            <div className={styles.mainInfo}>
                <h3>{title}</h3>
                
            </div>
		</div>
	);
};
