import { Avatar, TableCell, TableRow } from '@mui/material';
import React from 'react';
import cat from '../../../../../../../../../assets/cat.png';

export const KudosListItem = ({ avatar, firstname, lastname, sent, kudos }) => {
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
				<Avatar src={avatar || cat} />
			</TableCell>
			<TableCell>{firstname}</TableCell>
			<TableCell>{lastname}</TableCell>
			<TableCell>{kudos}</TableCell>
			<TableCell>{formatDate(sent)}</TableCell>
		</TableRow>
	);
};
