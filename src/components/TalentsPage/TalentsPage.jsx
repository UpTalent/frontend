import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GeneralTalent } from './components/GeneralTalent';
import { PagesGrid } from '../shared/Grid';
import { useStoreDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import {
	clearList,
	getGridItem,
	getGridList,
	getGridTotalPages,
	getTalentsList,
	pendingStatus,
} from '../../redux/reducers/dataList';

export const TalentsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const dispatch = useStoreDispatch();

	const talentList = useSelector(getGridList);
	const total_pages = useSelector(getGridTotalPages);
	const isLoading = useSelector(pendingStatus);
	const gridItems = useSelector(getGridItem);

	const urlPage = Number(searchParams.get('page')) || 1;

	useEffect(() => {
		dispatch(getTalentsList(urlPage - 1));

		return () => dispatch(clearList());
	}, [urlPage]);

	useEffect(() => {
		if (urlPage < 0 || (total_pages < urlPage && total_pages !== 0)) {
			setSearchParams({ page: '1' });
		}
	});

	let talentsList = talentList.map(talent => (
		<Grid item md={6} sm={12} lg={4} key={talent.id}>
			<GeneralTalent talent={talent} />
		</Grid>
	));
	return (
		<>
			{isLoading || gridItems !== 'talents' ? (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			) : (
				<PagesGrid gridItems={talentsList} total_pages={total_pages} />
			)}
		</>
	);
};
