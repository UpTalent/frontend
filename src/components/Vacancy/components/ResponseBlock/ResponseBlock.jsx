import React, { useState } from 'react';
import styles from './ResponseBlock.module.css';
import { useSelector } from 'react-redux';
import {
	getRole,
	getUserEmail,
} from '../../../../redux/reducers/authentification';
import { TalentForm } from './ResponseForm/TalentForm/TalentForm';
import { ResponseFull } from './components/ResponseFull';

export const ResponseBlock = ({
	canRespond,
	talentSubmission,
	sponsorSubmissions,
}) => {
	const userRole = useSelector(getRole);
	const userEmail = useSelector(getUserEmail);
	const [talentResponse, setTalentReponse] = useState(talentSubmission);

	const talentBlock = !talentResponse ? (
		<TalentForm {...{ canRespond, userEmail, setTalentReponse }} />
	) : (
		<ResponseFull {...talentResponse} />
	);

	const sponsorBlock = Boolean(sponsorSubmissions?.length) && (
		<>
			<hr />
			<h3>Responses to this vacancy:</h3>
			{sponsorSubmissions?.map((response, index) => (
				<ResponseFull {...response} key={index} />
			))}
		</>
	);

	return (
		<div className={styles[`${userRole}Block`]}>
			{userRole === 'talent' ? talentBlock : sponsorBlock}
		</div>
	);
};
