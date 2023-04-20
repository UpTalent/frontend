import { Avatar, TableCell, TableRow } from '@mui/material';
import React from 'react';

export const KudosListItem = ({ photo, firstname, lastname, sent, kudos }) => {
	const formatDate = dateString => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${day.toString().padStart(2, '0')}.${month
			.toString()
			.padStart(2, '0')}.${year} ${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}`;
	};
	return (
		<TableRow>
			<TableCell>
				<Avatar src={photo} />
			</TableCell>
			<TableCell>{firstname}</TableCell>
			<TableCell>{lastname}</TableCell>
			<TableCell>{formatDate(sent)}</TableCell>
			<TableCell>{kudos}</TableCell>
		</TableRow>
	);
};
