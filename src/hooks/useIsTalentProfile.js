import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getAuthTalentId } from '../redux/reducers/authentification';

export const useIsTalentProfile = () => {
	const [isTalentProfile, setIsTalentProfile] = useState(false);
	const { talentId } = useParams();
	const authTalent = useSelector(getAuthTalentId);
	setIsTalentProfile(Number(talentId) === authTalent);
	return isTalentProfile;
};
