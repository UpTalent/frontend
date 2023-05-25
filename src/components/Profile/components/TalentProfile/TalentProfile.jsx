import React from 'react';
import { TalentInfo } from '../UserInfo';
import { Outlet, useOutletContext } from 'react-router-dom';

export const TalentProfile = () => {
	const { user, isUserProfile } = useOutletContext();
	const tabLabels = [
		{ label: 'About me', link: '', key: `${user.id}` },
		{ label: 'Proofs', link: 'proofs?page=1&filter=PUBLISHED', key: 'proofs' },
		{ label: 'Statistics', link: 'statistics', key: 'statistics' },
	];
	return (
		<>
			<TalentInfo talent={user} isTalentProfile={isUserProfile} />
			<Outlet context={{ tabLabels, user, isUserProfile }} />
		</>
	);
};
