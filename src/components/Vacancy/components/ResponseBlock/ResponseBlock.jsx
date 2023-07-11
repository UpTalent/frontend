import React from 'react';
import { useSelector } from 'react-redux';
import {
	getRole,
	getUserEmail,
} from '../../../../redux/reducers/authentification';
import { TalentForm } from './ResponseForm/TalentForm/TalentForm';
import { ResponseFull } from './components/ResponseFull';

export const ResponseBlock = ({ canRespond }) => {
	const userRole = useSelector(getRole);
	const userEmail = useSelector(getUserEmail);

	return (
		<div>
			{userRole === 'talent' && <TalentForm {...{ canRespond, userEmail }} />}
			<ResponseFull />
		</div>
	);
};
