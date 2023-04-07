import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GeneralTalent } from './components/GeneralTalent';
import { PagesGrid } from '../shared/Grid';
import { useStoreDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getTalentList, getTalentsList, getTotalePages } from '../../redux/reducers/talents';



export const TalentsPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();

	const dispatch = useStoreDispatch();
	const talentList = useSelector(getTalentList);
	const total_pages = useSelector(getTotalePages);
	const urlPage =
		searchParams.get('page') > 0 ? searchParams.get('page') - 1 : 0;
		
	useEffect(() => {
		setIsLoading(true);
		dispatch(getTalentsList(urlPage));
		setIsLoading(false);
	}, [urlPage]);

	// useEffect(() => {
	// 	if (urlPage > total_pages || urlPage <= 0) {
	// 		setSearchParams({ page: '1' });
	// 	}
	// }, [total_pages]);

	let talentsList = talentList.map(talent => (
		<Grid item md={6} sm={12} lg={4} key={talent.id}>
			<GeneralTalent talent={talent} />
		</Grid>
	));
	return (
		<>
			{!isLoading && talentList ? (
				<PagesGrid gridItems={talentsList} total_pages={total_pages} />
			) : (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			)}
		</>
	);
};
