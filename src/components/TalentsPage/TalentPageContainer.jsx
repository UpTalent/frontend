import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { talentsAPI } from '../../api/talentsAPI';
import { Context } from '../../context';
import { TalentsPage } from './TalentsPage';

export const TalentPageContainer = () => {
	const { talentList, setTalentList } = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const getTalents = async page => {
		setIsLoading(true);
		const { data } = await talentsAPI.getTalents(page);
		setTalentList(data);
		setIsLoading(false);
	};

	useEffect(() => {
		getTalents();
	}, []);

	return (
		<>
			{!isLoading && talentList ? (
				<TalentsPage
					{...talentList}
					requestTalent={getTalents}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			) : (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			)}
		</>
	);
};
