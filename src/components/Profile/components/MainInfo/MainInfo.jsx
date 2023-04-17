import React, { useState } from 'react';
import styles from './MainInfo.module.css';
import { Tab, Tabs } from '@mui/material';
import { Link, Outlet, useOutletContext } from 'react-router-dom';

export const MainInfo = () => {
	const { aboutMe, isTalentProfile } = useOutletContext();
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const tabLabels = [
		{ label: 'About me', link: '' },
		{ label: 'Proofs', link: 'proofs?page=1&filter=PUBLISHED' },
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
						sx={{ fontSize: '20px' }}
					/>
				))}
			</Tabs>
			<Outlet context={{ aboutMe, isTalentProfile }} />
		</div>
	);
};
