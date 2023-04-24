import React, { useState } from 'react';
import styles from './MainInfo.module.css';
import { Tab, Tabs } from '@mui/material';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';

export const MainInfo = () => {
	const { tabLabels, user, isUserProfile } = useOutletContext();
	const location = useLocation();
	const initialValue = location.pathname.endsWith('proofs') ? 1 : 0;
	const [value, setValue] = useState(initialValue);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
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
			<Outlet
				context={{ aboutMe: user?.about_me, isTalentProfile: isUserProfile }}
			/>
		</div>
	);
};
