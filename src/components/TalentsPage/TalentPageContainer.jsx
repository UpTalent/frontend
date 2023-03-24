import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { talentsAPI } from '../../api/talentsAPI';
import { TalentsPage } from './TalentsPage';

export const TalentPageContainer = () => {

	const [talentsList, setTalents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getTalents = async page => {
		setIsLoading(true);
		const { data } = await talentsAPI.getTalents(page);
		setTalents(data);
		setIsLoading(false);
	};

	useEffect(() => {
		getTalents();
	}, []);

	return (
		<>
			{isLoading ? (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			) : (
				<TalentsPage
					{...talentsList}
					isTalent={true}
					requestTalent={getTalents}
				/>
			)}
      
		</>
	);
};
