import { IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../ResponseBlock.module.css';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ResponseForm } from '../ResponseForm';
import { setSystemMessage } from '../../../../../../redux/reducers/systemMessages';
import { vacancyAPI } from '../../../../../../api/vacancyAPI';

export const SponsorForm = ({ responseId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [status, setStatus] = useState(null);

	const dispatch = useDispatch();
	const { vacancyId } = useParams();

	const fieldNames = {
		label: 'Response to talent',
		placeholder:
			status === 'DENIED'
				? 'Tell why this talent is not appropriate for this job'
				: 'You can write date/time of interview',
	};

	const handleSubmit = async responseInfo => {
		try {
			const requestData = { feedback: { ...responseInfo, status } };
			setIsFetching(true);
			const { status } = await vacancyAPI.sponsorResponse(
				vacancyId,
				responseId,
				requestData,
			);
			if (status === 200) {
				
			}
			dispatch(setSystemMessage(true, 'Your response was sent successfully!'));
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
		setIsFetching(false);
	};

	return (
		<>
			{!isOpen && (
				<div className={styles.sponsorsControlls}>
					<Tooltip
						title='Approve response'
						onClick={() => {
							setStatus('APPROVED');
							setIsOpen(true);
						}}
					>
						<IconButton>
							<DoneAllIcon color='success' />
						</IconButton>
					</Tooltip>
					<Tooltip
						title='Deny response'
						onClick={() => {
							setStatus('DENIED');
							setIsOpen(true);
						}}
					>
						<IconButton>
							<ClearIcon color='error' />
						</IconButton>
					</Tooltip>
				</div>
			)}

			{isOpen && status && (
				<div className={styles.sponsorForm}>
					<ResponseForm
						{...{
							fieldNames,
							setIsOpen,
							isFetching,
							handleSubmit,
							action: 'REPLY',
							withContacts: status === 'APPROVED',
						}}
					/>
				</div>
			)}
		</>
	);
};
