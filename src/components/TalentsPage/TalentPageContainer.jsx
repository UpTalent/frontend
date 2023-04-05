import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TalentsPage } from './TalentsPage';
import { useStoreDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getTalentList, getTalentsList, getTotalePages } from '../../redux/reducers/talents';

export const TalentPageContainer = () => {
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
	}, [searchParams]);

	useEffect(() => {
		if (urlPage > total_pages || urlPage <= 0) {
			setSearchParams({ page: '1' });
		}
	}, [total_pages]);

	return (
		<>
			{!isLoading && talentList ? (
				<TalentsPage talentList={talentList} total_pages={total_pages} />
			) : (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			)}
		</>
	);
};
