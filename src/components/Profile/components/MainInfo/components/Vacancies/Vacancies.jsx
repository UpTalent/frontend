import { Fab } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useModalPathname } from '../../../../../../service/hooks/useModalPathname';
import { Outlet, useOutletContext } from 'react-router-dom';
import { withList } from '../../../../../../service/HOC/withList';
import { VacancyGeneral } from '../../../../../Vacancy/components/VacancyGeneral/VacancyGeneral';
import styles from '../../MainInfo.module.css';
import { FilterStatus } from '../Proofs/components/FilterStatus';
import { VacancyLoader } from '../../../../../loaders/VacancyLoader';

const Vacancies = ({ isFetching, items }) => {
	const { isUserProfile } = useOutletContext();
	const modalPathname = useModalPathname();
	const [mode, setMode] = useState('create');
	const [vacancy, setVacancy] = useState(initialVacancy);

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
						<VacancyGeneral
							vacancy={el}
							key={id}
							{...(isUserProfile && {
								setVacancy,
								setMode,
								showControlls: true,
							})}
						/>
					))}
				</div>
			) : (
				<VacancyLoader />
			)}

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

export default withList(Vacancies, 'vacancies');
