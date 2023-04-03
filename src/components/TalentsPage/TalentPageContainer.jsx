import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { talentsAPI } from '../../api/talentsAPI';
import { Context } from '../../context';
import { TalentsPage } from './TalentsPage';

export const TalentPageContainer = () => {
	const { talentList, setTalentList } = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const urlPage =
			searchParams.get('page') > 0 ? searchParams.get('page') - 1 : 0;

		const getTalents = async page => {
			setIsLoading(true);
			const { data } = await talentsAPI.getTalents(page);
			if (page > data.total_pages || page <= 0) {
				setSearchParams({ page: '1' });
			}
			setTalentList(data);
			setIsLoading(false);
		};

		getTalents(urlPage);
	}, [searchParams]);

	return (
		<>
			{!isLoading && talentList ? (
				<TalentsPage {...talentList} />
			) : (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			)}
		</>
	);
};
