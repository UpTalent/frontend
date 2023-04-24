import React from 'react';
import { ProfileInfo } from '../UserInfo/ProfileInfo';
import { Outlet, useOutletContext } from 'react-router-dom';
import { ReactComponent as NotPresCat } from '../../../../assets/notPressedCat.svg';

export const SponsorProfile = () => {
	const { user, isUserProfile } = useOutletContext();
	const tabLabels = [{ label: 'History', link: '' }];
	return (
		<>
			<ProfileInfo
				element={<NotPresCat />}
				header={'Kudos balance'}
				info={user.kudos}
			/>
			<Outlet context={{ tabLabels, user, isUserProfile }} />
		</>
	);
};
