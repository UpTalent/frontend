import React, { useState } from 'react';
import styles from './MainInfo.module.css';
import { Tab, Tabs } from '@mui/material';
import { AboutMe } from './components/AboutMe';
import { Proofs } from './components/Proofs';
import { Link, Outlet } from 'react-router-dom';

export const MainInfo = ({ aboutMe, isTalentProfile }) => {
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const tabLabels = [
		{ label: 'About me', link: '' },
		{ label: 'Proofs', link: 'proofs?page=1&filter=PUBLISHED' },
	];
	const tabContent = [
		<AboutMe aboutMe={aboutMe} />,
		<Proofs isTalentProfile={isTalentProfile} />,
	];
	return (
		<div className={styles.mainInfo}>
			<Tabs value={value} onChange={handleChange}>
				{tabLabels.map((item, index) => (
					<Tab
						key={index}
						label={item.label}
						component={Link}
						to={`${item.link}`}
						sx={{fontSize: '20px'}}
					/>
				))}
			</Tabs>
			{tabContent[value]}
			{/* <Outlet /> */}
		</div>
	);
};
