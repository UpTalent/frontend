import React, { useState } from 'react';
import styles from './ResponseBlock.module.css';
import { useSelector } from 'react-redux';
import {
	getRole,
	getUserEmail,
} from '../../../../redux/reducers/authentification';
import { TalentForm } from './ResponseForm/TalentForm/TalentForm';
import { ResponseFull } from './components/ResponseFull';
import { SponsorForm } from './ResponseForm/SponsorForm/SponsorForm';

export const ResponseBlock = ({
	canRespond,
	talentSubmission,
	sponsorSubmissions,
}) => {
	const userRole = useSelector(getRole);
	const [talentResponse, setTalentReponse] = useState(talentSubmission);

	const talentBlock = !talentResponse ? (
		<TalentForm {...{ canRespond, setTalentReponse }} />
	) : (
		<ResponseFull {...talentResponse} />
	);

	const sponsorBlock = Boolean(sponsorSubmissions?.length) && (
		<>
			<hr />
			<h3>Responses to this vacancy:</h3>
			{sponsorSubmissions?.map((response, index) => (
				<div className={styles.sponsorContainer} key={index}>
					<ResponseFull {...response} />
					<SponsorForm />
				</div>
			))}
		</>
	);

	return (
		<div className={styles[`${userRole}Block`]}>
			{userRole === 'talent' ? talentBlock : sponsorBlock}
		</div>
	);
};
