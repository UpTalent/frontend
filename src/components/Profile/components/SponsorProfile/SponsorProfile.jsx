import React, { useEffect } from 'react';
import { ProfileInfo } from '../UserInfo/ProfileInfo';
import { Outlet, useOutletContext } from 'react-router-dom';
import { ReactComponent as NotPresCat } from '../../../../assets/notPressedCat.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUserKudos,
	setKudos,
} from '../../../../redux/reducers/authentification';
import { formatNumber } from '../../../../service/hooks/formatNumber';

export const SponsorProfile = () => {
	const { user, isUserProfile } = useOutletContext();
	const tabLabels = [{ label: 'History', link: '' }];
	const sponsorKudos = useSelector(getUserKudos);
	const dispatch = useDispatch();

	useEffect(() => {
		if (sponsorKudos !== user.kudos) {
			dispatch(setKudos(user.kudos));
		}
	}, [user.kudos]);

	return (
		<>
			<ProfileInfo
				element={<NotPresCat />}
				header={'Kudos balance'}
				info={formatNumber(sponsorKudos)}
			/>
			<Outlet context={{ tabLabels, user, isUserProfile }} />
		</>
	);
};
