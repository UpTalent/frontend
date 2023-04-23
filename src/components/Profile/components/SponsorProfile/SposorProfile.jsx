import React from 'react';
import { PhotoBlock } from '../PhotoBlock';
import { UserInfo } from '../UserInfo';

export const SposorProfile = ({ userInfo }) => {
	return (
		<>
			<PhotoBlock />
			<UserInfo />
		</>
	);
};
