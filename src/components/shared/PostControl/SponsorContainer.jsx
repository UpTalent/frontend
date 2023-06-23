import React from 'react';
import { PostControl } from './PostControl';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthId } from '../../../redux/reducers/authentification';
import { vacancyAPI } from '../../../api/vacancyAPI';
import {
	deleteItemFromList,
	getItemList,
} from '../../../redux/reducers/userItems';
import { setSystemMessage } from '../../../redux/reducers/systemMessages';
import { useSearchParams } from 'react-router-dom';
import { prepareItem } from '../../../redux/reducers/proof';

export const SponsorContainer = ({ vacancy, ...props }) => {
	const [searchParams] = useSearchParams();

	const sponsorId = useSelector(getAuthId);
	const requiredVacancy = useSelector(getItemList).find(
		item => item.id === vacancy.id,
	);

	const dispatch = useDispatch();

	const editHandler = () => {
		props.setVacancy(requiredVacancy);
		props.setMode('edit');
		return 'createVacancy';
	};

	const changeVisabilityHandler = async status => {
		try {
			await vacancyAPI.editVacancy(vacancy.id, {
				...prepareItem(vacancy),
				status: status,
			});
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};

	const deleteHandler = async () => {
		try {
			await vacancyAPI.deleteVacancy(vacancy.id);
			dispatch(setSystemMessage(true, 'Your proof was succesfully deleted'));

			dispatch(
				deleteItemFromList({
					itemId: vacancy.id,
					id: sponsorId,
					item: 'vacancies',
					status: searchParams.get('filter'),
				}),
			);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};

	return (
		<PostControl
			{...{
				status: vacancy.status,
				id: vacancy.id,
				editHandler,
				changeVisabilityHandler,
				deleteHandler,
			}}
		/>
	);
};
