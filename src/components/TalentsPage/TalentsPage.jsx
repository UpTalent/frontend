import { Grid } from '@mui/material';
import React from 'react';
import { GeneralTalent } from './components/GeneralTalent';
import { PagesGrid } from '../shared/Grid';
import { useSelector } from 'react-redux';
import { getGridList, getTalentsList } from '../../redux/reducers/dataList';
import { withURL } from '../../service/HOC/withURL';
import { Filter } from './components/Filter/Filter';
import { NothingToDisplay } from '../shared/NothingToDisplay';

const TalentsPage = ({ total_pages, filterHandler, filterItems }) => {
	const talentList = useSelector(getGridList);

	let talentsList = talentList.map(talent => (
		<Grid item sm={12} lg={6} xl={4} key={talent.id}>
			<GeneralTalent talent={talent} />
		</Grid>
	));
	return (
		<>
			<Filter {...{ filterItems, filterHandler, showFilter: ['skills'] }} />
			{talentList.length ? (
				<PagesGrid gridItems={talentsList} {...{ total_pages }} />
			) : (
				<NothingToDisplay searchData={filterItems} />
			)}
		</>
	);
};

export default withURL(TalentsPage, getTalentsList, 'talents');
