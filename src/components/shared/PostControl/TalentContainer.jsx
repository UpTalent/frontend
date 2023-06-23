import React from 'react';
import { PostControl } from './PostControl';
import { useSelector } from 'react-redux';
import {
	deleteProof,
	editProof,
	fetchProof,
} from '../../../redux/reducers/proof';
import { useStoreDispatch } from '../../../redux/store';
import { getAuthId } from '../../../redux/reducers/authentification';

export const TalentContainer = ({ status, id }) => {
	const talentId = useSelector(getAuthId);
	const dispatch = useStoreDispatch();

	const deleteHandler = () => {
		dispatch(deleteProof({ talentId, proofId: id, status }));
	};

	const editHandler = () => {
		dispatch(fetchProof({ talentId, proofId: id }));
		return 'createProof';
	};

	const changeVisabilityHandler = status => {
		const data = { talentId, proofId: id, status };
		dispatch(editProof(data));
	};

	return (
		<PostControl
			{...{ status, id, editHandler, changeVisabilityHandler, deleteHandler }}
		/>
	);
};
