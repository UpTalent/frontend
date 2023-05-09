import React, { useEffect, useState } from 'react';
import styles from './MainInfo.module.css';
import { Tab, Tabs } from '@mui/material';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';

export const MainInfo = () => {
	const { tabLabels, user, isUserProfile } = useOutletContext();

	const location = useLocation();
	const currentLocation = location.pathname.endsWith('proofs') ? 1 : 0;
	const [value, setValue] = useState(currentLocation);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		setValue(currentLocation);
	}, [currentLocation]);

	return (
		<div className={styles.mainInfo}>
			<Tabs value={value} onChange={handleChange}>
				{tabLabels?.map((item, index) => (
					<Tab
						key={index}
						label={item.label}
						component={Link}
						to={`${item.link}`}
						sx={{ fontSize: '20px' }}
					/>
				))}
			</Tabs>
			<Outlet context={{ ...user, isTalentProfile: isUserProfile }} />
		</div>
	);
};
