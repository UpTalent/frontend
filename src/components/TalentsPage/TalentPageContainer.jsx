import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { talentsAPI } from '../../api/talentsAPI';
import { Context } from '../../context';
import { TalentsPage } from './TalentsPage';

export const TalentPageContainer = () => {

	const {talentList, setTalentList} = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);

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
			{isLoading ? (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			) : (
				<TalentsPage
					{...talentList}
					requestTalent={getTalents}
				/>
			)}
      
		</>
	);
};
