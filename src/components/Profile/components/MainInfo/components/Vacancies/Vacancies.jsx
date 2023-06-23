import { Fab } from '@mui/material';
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useModalPathname } from '../../../../../../service/hooks/useModalPathname';
import { Outlet } from 'react-router-dom';
import { vacancyAPI } from '../../../../../../api/vacancyAPI';

export const Vacancies = () => {
=======
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useModalPathname } from '../../../../../../service/hooks/useModalPathname';
import { Outlet, useOutletContext } from 'react-router-dom';
import { withList } from '../../../../../../service/HOC/withList';
import { VacancyGeneral } from '../../../../../Vacancy/components/VacancyGeneral/VacancyGeneral';
import styles from '../../MainInfo.module.css';
import { FilterStatus } from '../Proofs/components/FilterStatus';
import { ProofLoader } from '../../../../../loaders/ProofLoader/ProofLoader';

const Vacancies = ({ isFetching, items }) => {
	const { isUserProfile } = useOutletContext();
>>>>>>> dev
	const modalPathname = useModalPathname();
	const [mode, setMode] = useState('create');
	const [vacancy, setVacancy] = useState(initialVacancy);

<<<<<<< HEAD
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
=======
	const handleAdding = () => {
		modalPathname('createVacancy');
		setVacancy(initialVacancy);
		setMode('create');
	};

	return (
		<>
			{isUserProfile && (
				<div className={styles.itemsContolls}>
					<Fab color='secondary' aria-label='add' onClick={handleAdding}>
						<AddIcon />
					</Fab>
					<FilterStatus />
				</div>
			)}
			{!isFetching ? (
				<div className={styles.items}>
					{!items.length && (
						<p className={styles.emptyList}>It's empty in here...for now</p>
					)}
					{items.map((el, id) => (
						<VacancyGeneral {...el} key={id} />
					))}
				</div>
			) : (
				//зробити інший лоадер
				<ProofLoader />
			)}

>>>>>>> dev
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
<<<<<<< HEAD
=======

export default withList(Vacancies, 'vacancies');
>>>>>>> dev
