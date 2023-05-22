import React from 'react';
import styles from './Statistics.module.css';
import { useState } from 'react';
import { LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { profileAPI } from '../../../../api/profileAPI';
import { TopSkills } from './components/TopSkills/TopSkills';
import { useParams } from 'react-router-dom';

export const Statistics = () => {
	const [statisticData, setStatisticData] = useState(null);
	const { talentId } = useParams();

	const getTalentStatistics = async () => {
		const { data } = await profileAPI.getStatistics(talentId);
		setStatisticData(data);
	};

	useEffect(() => {
		getTalentStatistics();
	}, []);

	return (
		<div className={styles.container}>
			{statisticData ? (
				<>
					<TopSkills skills={statisticData.most_kudosed_skills} />
				</>
			) : (
				<LinearProgress />
			)}
		</div>
	);
};
