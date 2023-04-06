import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { talentsAPI } from '../../api/talentsAPI';
import { Context } from '../../context';
import { GeneralTalent } from './components/GeneralTalent';
import { PagesGrid } from '../shared/Grid';

export const TalentsPage = () => {
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

	let talentsList = talentList?.content?.map(talent => (
		<Grid item md={6} sm={12} lg={4} key={talent.id}>
			<GeneralTalent talent={talent} />
		</Grid>
	));

	return (
		<>
			{!isLoading && talentList ? (
				<PagesGrid gridItems={talentsList} total_pages={talentList.total_pages} />
			) : (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			)}
		</>
	);
};
