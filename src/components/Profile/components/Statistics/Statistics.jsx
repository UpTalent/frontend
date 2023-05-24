import React from 'react';
import styles from './Statistics.module.css';
import { useState } from 'react';
import { LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { profileAPI } from '../../../../api/profileAPI';
import { TopSkills } from './components/TopSkills';
import { useParams } from 'react-router-dom';
import { TopProof } from './components/TopProof';
import { TotalKudos } from './components/TotalKudos';

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
					<TotalKudos kudos={statisticData.total_count_kudos} />
					<TopProof proof={statisticData.most_kudosed_proof} />
				</>
			) : (
				<LinearProgress />
			)}
		</div>
	);
};
