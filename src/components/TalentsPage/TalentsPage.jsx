import { Grid } from '@mui/material';
import React from 'react';
import { GeneralTalent } from './components/GeneralTalent';
import { PagesGrid } from '../shared/Grid';
import { useSelector } from 'react-redux';
import {
	getFilter,
	getGridList,
	getTalentsList,
} from '../../redux/reducers/dataList';
import { withURL } from '../../service/HOC/withURL';
import { Filter } from './components/Filter/Filter';
import { useStoreDispatch } from '../../redux/store';

const TalentsPage = ({ total_pages, urlPage }) => {
	const talentList = useSelector(getGridList);
	const filterItems = useSelector(getFilter).skills;
	const dispatch = useStoreDispatch();

	const filterHandler = async () => {
		const filter = filterItems.map(el => el.name);
		dispatch(getTalentsList({ page: urlPage - 1, filter }));
	};
	let talentsList = talentList.map(talent => (
		<Grid item sm={12} lg={6} xl={4} key={talent.id}>
			<GeneralTalent talent={talent} />
		</Grid>
	));
	return (
		<>
			<Filter {...{ filterItems, filterHandler, showFilter: ['skills'] }} />
			<PagesGrid gridItems={talentsList} {...{ total_pages }} />
		</>
	);
};

export default withURL(TalentsPage, getTalentsList, 'talents');
