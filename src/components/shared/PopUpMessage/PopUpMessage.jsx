import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSystemMessage } from '../../../redux/reducers/systemMessages';

export const PopUpMessage = ({ status, message }) => {
	const isSystemMessage = useSelector(state => state.systemMessage.isSystemMessage);
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
