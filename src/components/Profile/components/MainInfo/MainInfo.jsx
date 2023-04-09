import React, { useState } from 'react';
import styles from './MainInfo.module.css';
import { Tab, Tabs } from '@mui/material';
import { AboutMe } from './components/AboutMe';
import { Proofs } from './components/Proofs';

export const MainInfo = ({ aboutMe, isTalentProfile }) => {
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const tabLabels = ['About me', 'Proofs'];
	const tabContent = [
		<AboutMe aboutMe={aboutMe} />,
		<Proofs isTalentProfile={isTalentProfile} />,
	];
	return (
		<div className={styles.mainInfo}>
			<Tabs value={value} onChange={handleChange}>
				{tabLabels.map((label, index) => (
					<Tab key={index} label={label} />
				))}
			</Tabs>
			{tabContent[value]}
		</div>
	);
};
