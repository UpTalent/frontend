import React, { useEffect, useState } from 'react';
import styles from './MainInfo.module.css';
import { Tab, Tabs } from '@mui/material';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';

export const MainInfo = () => {
	const { tabLabels, user, isUserProfile } = useOutletContext();

	const location = useLocation();
	const currentLocation = tabLabels.findIndex(
		el => el.key === location.pathname.split('/').at(-1),
	);
	const [value, setValue] = useState(currentLocation);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		setValue(currentLocation);
	}, [location.pathname]);

	return (
		<div className={styles.mainInfo}>
			<Tabs value={value !== -1 ? value : 0} onChange={handleChange}>
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
