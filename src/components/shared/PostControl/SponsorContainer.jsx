import React from 'react';
import { PostControl } from './PostControl';
import { useSelector } from 'react-redux';
import { getAuthId } from '../../../redux/reducers/authentification';

export const SponsorContainer = ({ status, id }) => {
	const sponsorId = useSelector(getAuthId);

	const editHandler = () => {};

	const changeVisabilityHandler = () => {};
    
	const deleteHandler = () => {};

	return (
		<PostControl
			{...{ status, id, editHandler, changeVisabilityHandler, deleteHandler }}
		/>
	);
};
