import { Avatar, TableCell, TableRow } from '@mui/material';
import React from 'react';
import cat from '../../../../../../../../../assets/cat.png';

export const KudosListItem = ({ avatar, fullname, sent, kudos, skills }) => {
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
			<TableCell>{fullname}</TableCell>
			<TableCell align='center'>{kudos}</TableCell>
			<TableCell>
				{skills.map((el, id) => (
					<p key={id} style={{ fontWeight: '300' }}>
						{el.name}: {el.kudos}
					</p>
				))}
			</TableCell>
			<TableCell>{formatDate(sent)}</TableCell>
		</TableRow>
	);
};
