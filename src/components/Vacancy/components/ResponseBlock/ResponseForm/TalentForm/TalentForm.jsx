import React from 'react';
import { ResponseForm } from '../ResponseForm';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../../../redux/reducers/systemMessages';
import { vacancyAPI } from '../../../../../../api/vacancyAPI';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const TalentForm = ({ setIsOpen }) => {
	const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();
	const { vacancyId } = useParams();

	const handleSubmit = async responseInfo => {
        
		try {
			setIsFetching(true);
			const { data } = await vacancyAPI.vacancyResponse(
				vacancyId,
				responseInfo,
			);

			dispatch(
				setSystemMessage(
					true,
					'Your response was sent! Wait untill sponsor reply on it',
				),
			);
			setIsFetching(false);

		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};
	return (
		<ResponseForm
			withContacts={true}
			{...{ handleSubmit, setIsOpen, isFetching }}
		/>
	);
};
