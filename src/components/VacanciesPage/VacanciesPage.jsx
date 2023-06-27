import React from 'react';
import { withAuth } from '../../service/HOC/withAuth';
import { withURL } from '../../service/HOC/withURL';
import { NothingToDisplay } from '../shared/NothingToDisplay';
import { PagesGrid } from '../shared/Grid';
import { useSelector } from 'react-redux';
import { VacancyGeneral } from '../Vacancy/components/VacancyGeneral/VacancyGeneral';
import { getGridList, getVacanciesList } from '../../redux/reducers/dataList';
import { Filter } from '../TalentsPage/components/Filter/Filter';
import { Grid } from '@mui/material';

const VacanciesPage = ({ total_pages, filterHandler, filterItems }) => {
	const vacancyList = useSelector(getGridList);

	const gridVacancies = vacancyList.map(vacancy => (
		<Grid item sm={12} lg={12} xl={12} key={vacancy.id}>
			<VacancyGeneral vacancy={vacancy} />
		</Grid>
	));

	return (
		<>
			<Filter
				{...{
					filterItems,
					filterHandler,
					showFilter: ['skills', 'sortByDate'],
				}}
			/>
			{vacancyList.length ? (
				<PagesGrid gridItems={gridVacancies} {...{ total_pages }} />
			) : (
				<NothingToDisplay searchData={filterItems} />
			)}
		</>
	);
};

export default withAuth(withURL(VacanciesPage, getVacanciesList, 'vacancies'));
