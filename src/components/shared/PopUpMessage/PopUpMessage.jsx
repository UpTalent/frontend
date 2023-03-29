import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { Context } from '../../../context';

export const PopUpMessage = ({ status, message }) => {
	const { messageForUser, setMessageForUser } = useContext(Context);

	const handleClose = () => {
		setMessageForUser(false);
	};
	return (
		<>
			{messageForUser && (
				<Snackbar
					open={messageForUser}
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
