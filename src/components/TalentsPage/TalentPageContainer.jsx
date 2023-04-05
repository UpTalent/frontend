import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TalentsPage } from './TalentsPage';
import { useStoreDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getTalentsList } from '../../redux/reducers/talents';

export const TalentPageContainer = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();

	const dispatch = useStoreDispatch();
	const talentList = useSelector(state => state.talents.talentsList);
	const total_pages = useSelector(state => state.talents.total_pages);

	useEffect(() => {
		const urlPage =
			searchParams.get('page') > 0 ? searchParams.get('page') - 1 : 0;

		const getTalents = async page => {
			setIsLoading(true);
			dispatch(getTalentsList(page));
			if (page > total_pages || page <= 0) {
				setSearchParams({ page: '1' });
			}
			setIsLoading(false);
		};

		getTalents(urlPage);
	}, [searchParams]);

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
