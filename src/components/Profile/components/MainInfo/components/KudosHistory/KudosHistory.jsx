import React from 'react';
import { useParams } from 'react-router-dom';

export const KudosHistory = () => {
	const { sposorId } = useParams();
	return <div>KudosHistory of {sposorId}</div>;
};
