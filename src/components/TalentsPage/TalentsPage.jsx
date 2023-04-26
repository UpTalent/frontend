import { Grid } from '@mui/material';
import React from 'react';
import { GeneralTalent } from './components/GeneralTalent';
import { PagesGrid } from '../shared/Grid';
import { useSelector } from 'react-redux';
import {
	getGridList,
	getTalentsList,
} from '../../redux/reducers/dataList';
import { withURL } from '../../service/HOC/withURL';

const TalentsPage = ({ total_pages }) => {
	const talentList = useSelector(getGridList);

	let talentsList = talentList.map(talent => (
		<Grid item md={6} sm={12} lg={4} key={talent.id}>
			<GeneralTalent talent={talent} />
		</Grid>
	));
	return (
		<>
			<PagesGrid gridItems={talentsList} total_pages={total_pages} />
		</>
	);
};

export default withURL(TalentsPage, getTalentsList, 'talents');
