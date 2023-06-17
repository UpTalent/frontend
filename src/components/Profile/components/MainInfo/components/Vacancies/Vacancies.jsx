import { Button, Fab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useModalPathname } from '../../../../../../service/hooks/useModalPathname';
import { Outlet } from 'react-router-dom';
import { vacancyAPI } from '../../../../../../api/vacancyAPI';

export const Vacancies = () => {
	const modalPathname = useModalPathname();
	const [mode, setMode] = useState('create');
	const [vacancy, setVacancy] = useState(initialVacancy);

	// delete

	const trial = async () => {
		const { data } = await vacancyAPI.getVacancies();
		console.log(data);
	};

	useEffect(() => {
		trial();
	}, []);

	//

	return (
		<>
			<Fab
				color='secondary'
				aria-label='add'
				onClick={() => {
					modalPathname('createVacancy');
					setVacancy(initialVacancy);
					setMode('create');
				}}
			>
				<AddIcon />
			</Fab>
			<div>Vacancies</div>
			<Outlet context={{ mode, vacancy }} />
		</>
	);
};

const initialVacancy = {
	title: '',
	content: '',
	status: '',
	skills: [],
};
