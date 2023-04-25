import React from 'react';
import { ProfileInfo } from '../UserInfo/ProfileInfo';
import { Outlet, useOutletContext } from 'react-router-dom';
import { ReactComponent as NotPresCat } from '../../../../assets/notPressedCat.svg';
import { useFormat } from '../../../../hooks/useFormat';
import { useSelector } from 'react-redux';
import { getUserKudos } from '../../../../redux/reducers/authentification';

export const SponsorProfile = () => {
	const { user, isUserProfile } = useOutletContext();
	const tabLabels = [{ label: 'History', link: 'history' }];
	const sponsorKudos = useSelector(getUserKudos);
	const [kudos] = useFormat(sponsorKudos);
	return (
		<>
			<ProfileInfo
				element={<NotPresCat />}
				header={'Kudos balance'}
				info={kudos}
			/>
			<Outlet context={{ tabLabels, user, isUserProfile }} />
		</>
	);
};
