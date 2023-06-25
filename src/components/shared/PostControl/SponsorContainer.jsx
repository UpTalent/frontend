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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { prepareItem } from '../../../redux/reducers/proof';
import {
	DELETE,
	HIDDEN,
	HIDE,
	SHOW,
} from '../../../service/constants';

export const SponsorContainer = ({ vacancy, vacancyFull, ...props }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const navigate = useNavigate();

	const sponsorId = useSelector(getAuthId);
	const requiredVacancy = useSelector(getItemList).find(
		item => item.id === vacancy.id,
	);
	const dispatch = useDispatch();

	const messageHandler = status => {
		let action = '';
		switch (status) {
			case DELETE:
				action = 'deleted';
				break;
			case HIDE:
				action = 'hidden';
				break;
			case SHOW:
				action = 'published';
				break;
			default:
				break;
		}
		dispatch(setSystemMessage(true, `Your vacancy was successfully ${action}`));
	};

	const editHandler = () => {
		if (!vacancyFull) {
			props.setVacancy(requiredVacancy);
			props.setMode('edit');
		}
		return 'createVacancy';
	};

	const changeVisabilityHandler = async status => {
		try {
			await vacancyAPI.editVacancy(vacancy.id, {
				...prepareItem(vacancy),
				status,
			});

			if (vacancyFull) {
				props.setVacancy({ ...vacancy, status });
			}

			messageHandler(status === HIDDEN ? HIDE : SHOW);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}

		if (!vacancyFull) {
			setSearchParams({
				...Object.fromEntries([...searchParams]),
				filter: status,
			});
		}
	};

	const deleteHandler = async () => {
		try {
			await vacancyAPI.deleteVacancy(vacancy.id);
			messageHandler(DELETE);

			dispatch(
				deleteItemFromList({
					itemId: vacancy.id,
					id: sponsorId,
					item: 'vacancies',
					status: searchParams.get('filter'),
				}),
			);

			if (vacancyFull) {
				navigate(-1);
			}
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
