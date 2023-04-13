import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSystemMessage, setSystemMessage, systemMessageStatus, getMessageStatus } from '../../../redux/reducers/systemMessages';

export const PopUpMessage = () => {
	const isSystemMessage = useSelector(systemMessageStatus);
	const message = useSelector(getSystemMessage);
	const status = useSelector(getMessageStatus)
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setSystemMessage(false));
	};
	return (
		<>
			{isSystemMessage && (
				<Snackbar
					open={isSystemMessage}
					autoHideDuration={3000}
					message={message}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
						{message}
					</Alert>
				</Snackbar>
			)}
		</>
	);
};
