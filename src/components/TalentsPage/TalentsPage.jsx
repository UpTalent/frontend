import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GeneralTalent } from './components/GeneralTalent';
import { PagesGrid } from '../shared/Grid';
import { useStoreDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import {
	getTalentList,
	getTalentsList,
	getTotalePages,
	pendingStatus,
} from '../../redux/reducers/talents';

export const TalentsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const dispatch = useStoreDispatch();

	const talentList = useSelector(getTalentList);
	const total_pages = useSelector(getTotalePages);
	const isLoading = useSelector(pendingStatus);

	const urlPage = Number(searchParams.get('page')) || 1;

	useEffect(() => {
		dispatch(getTalentsList(urlPage - 1));
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
			{!isLoading && talentList ? (
				<PagesGrid
					gridItems={talentsList}
					total_pages={total_pages}
					page={urlPage}
				/>
			) : (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			)}
		</>
	);
};
