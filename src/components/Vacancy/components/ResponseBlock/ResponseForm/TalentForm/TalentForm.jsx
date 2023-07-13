import React from 'react';
import { ResponseForm } from '../ResponseForm';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../../../redux/reducers/systemMessages';
import { vacancyAPI } from '../../../../../../api/vacancyAPI';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { DisabledText } from '../../../../../shared/DisabledText/DisabledText';
import { Button } from '@mui/material';

export const TalentForm = ({ canRespond, userEmail, setTalentReponse }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const dispatch = useDispatch();
	const { vacancyId } = useParams();

	const initialValues = { contactInfo: userEmail, message: '' };
	const fieldNames = [
		{ name: 'contactInfo', label: 'Contact info' },
		{
			name: 'message',
			label: 'Cover letter',
			placeholder:
				'Introduce yourself and tell us what interests you about this vacancy',
		},
	];

	const handleSubmit = async responseInfo => {
		try {
			setIsFetching(true);
			const { data } = await vacancyAPI.vacancyResponse(
				vacancyId,
				responseInfo,
			);

			setTalentReponse(data);

			dispatch(
				setSystemMessage(
					true,
					'Your response was sent! Wait untill sponsor reply on it',
				),
			);
			setIsFetching(false);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
			setIsFetching(false);
		}
	};
	return (
		<>
			{!isOpen && (
				<DisabledText
					condition={!canRespond}
					helperText={'You don`t have enough skills to apply'}
				>
					<Button
						variant='contained'
						onClick={() => setIsOpen(true)}
						disabled={!canRespond}
						sx={{ borderRadius: '5px', width: '160px', fontSize: 'large' }}
					>
						Apply
					</Button>
				</DisabledText>
			)}
			{isOpen && (
				<ResponseForm
					withContacts={true}
					{...{
						handleSubmit,
						setIsOpen,
						isFetching,
						initialValues,
						action: 'APPLY',
						fieldNames
					}}
				/>
			)}
		</>
	);
};
