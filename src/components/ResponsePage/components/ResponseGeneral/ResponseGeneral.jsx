import React from 'react';
import styles from '../../../Vacancy/components/ResponseBlock/ResponseBlock.module.css';
import { Author } from '../../../shared/Proof/components/Author';
import { useNavigate } from 'react-router-dom';
import { Status } from '../../../shared/Proof/components/ProofTitle/components/Status/Status';
import { ManagingResponse } from '../../../Vacancy/components/ResponseBlock/components/ManagingResponse/ManagingResponse';
import { useHistory } from '../../../../service/hooks/useHistory';

export const ResponseGeneral = ({
	vacancy_submission,
	feedback_response,
	submission_response,
	withControll,
}) => {
	const navigate = useNavigate();
	const currentPath = useHistory();
	return (
		<div className={`${styles.reponseContainer} ${styles.responseGeneral}`}>
			<div className={styles.authorBlock}>
				<Author {...vacancy_submission.author} />
				{withControll && <ManagingResponse ableToDelete={submission_response.status !== 'SENT'} />}
			</div>
			<div
				className={styles.vacancyTitle}
				onClick={() =>
					navigate(`/vacancy/${vacancy_submission.id}`, {
						state: [currentPath],
					})
				}
			>
				<p>{vacancy_submission.title}</p>
				<Status status={submission_response.status} />
			</div>
		</div>
	);
};
