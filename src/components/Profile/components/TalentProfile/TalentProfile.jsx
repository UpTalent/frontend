import React from 'react';
import { TalentInfo } from '../UserInfo';
import { Outlet, useOutletContext } from 'react-router-dom';

export const TalentProfile = () => {
	const { user, isUserProfile } = useOutletContext();
	const tabLabels = [
		{ label: 'About me', link: '' },
		{ label: 'Proofs', link: 'proofs?page=1&filter=PUBLISHED' },
	];
	return (
		<>
			<TalentInfo talent={user} isTalentProfile={isUserProfile} />
			<Outlet context={{ tabLabels, user, isUserProfile }} />
		</>
	);
};
