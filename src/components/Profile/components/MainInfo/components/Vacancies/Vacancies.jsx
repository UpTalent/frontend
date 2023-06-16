import { Fab } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useModalPathname } from '../../../../../../service/hooks/useModalPathname';
import { Outlet } from 'react-router-dom';

export const Vacancies = () => {
	const modalPathname = useModalPathname();
	return (
		<>
			<Fab
				color='secondary'
				aria-label='add'
				onClick={() => {
					modalPathname('createVacancy');
				}}
			>
				<AddIcon />
			</Fab>
			<div>Vacancies</div>
			<Outlet />
		</>
	);
};
